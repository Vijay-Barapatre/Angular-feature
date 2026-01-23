import os
import re
import asyncio
import edge_tts
import PIL.Image

# COMPATIBILITY PATCH: Fix for Pillow 10+ where ANTIALIAS is removed
if not hasattr(PIL.Image, 'ANTIALIAS'):
    PIL.Image.ANTIALIAS = PIL.Image.LANCZOS

from moviepy.editor import *
import random
import time

# VOICE CONFIGURATION
VOICE = "en-US-ChristopherNeural"  

def clean_text(text):
    """Removes markdown formatting vs code quotes etc"""
    text = text.replace('`', '').replace('*', '')
    text = text.replace('<', ' ').replace('>', ' ')
    text = text.replace('[', ' ').replace(']', ' ')
    text = text.replace('(', ' ').replace(')', ' ')
    text = text.replace('"', '').replace("'", "")
    text = text.replace('\n', ' ')
    return text.strip()

def parse_transcript(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    segments = []
    # Regex to find segments
    seg_blocks = content.split('## Segment')
    for block in seg_blocks[1:]: # Skip preamble
        try:
            image_match = re.search(r'\*\*Image to use:\*\*\s*`?([^`\n\r]+)`?', block)
            transcript_match = re.search(r'\*\*Transcript:\*\*\s*"([^"]+)"', block, re.DOTALL)
            effect_match = re.search(r'\*\*Effect:\*\*\s*([^\n\r]+)', block)
            
            if not transcript_match:
                 transcript_match = re.search(r'\*\*Transcript:\*\*\s*([\s\S]+?)(?:---|$)', block)

            if image_match and transcript_match:
                img_name = image_match.group(1).strip()
                transcript_text = clean_text(transcript_match.group(1))
                effect = effect_match.group(1).strip() if effect_match else None
                
                # Legacy check removed to support multi-image strings
                # if not os.path.exists(img_name):
                #    print(f"WARNING: Image not found: {img_name}")
                #    continue

                segments.append({
                    'image': img_name,
                    'text': transcript_text,
                    'effect': effect
                })
        except Exception as e:
            print(f"Error parsing block: {e}")
            continue
            
    return segments

async def generate_audio_edge(text, output_file):
    """Generates audio using Edge TTS with Retry Logic and Voice Fallback"""
    voices = [VOICE, "en-US-AriaNeural", "en-US-GuyNeural"]
    
    for voice in voices:
        max_retries = 3
        for attempt in range(max_retries):
            try:
                print(f"    Attempting with voice: {voice} (Try {attempt+1})")
                communicate = edge_tts.Communicate(text, voice)
                await communicate.save(output_file)
                return True
            except Exception as e:
                print(f"    Error: {e}")
                await asyncio.sleep(2 + attempt) # Backoff
        
        print(f"    Voice {voice} failed completely. Trying next voice...")
    
    print("  [ERROR] All voices failed.")
    return False

# ... zoom effect function remains same ...

async def create_video_async(segments, output_file='input_output_tutorial.mp4'):
    clips = []
    
    print(f"Found {len(segments)} segments.")
    
    for i, seg in enumerate(segments):
        print(f"Processing segment {i+1}: {seg['image']}")
        
        # 1. Generate Audio (Async)
        audio_file = f"temp_vo_{i}.mp3"
        success = await generate_audio_edge(seg['text'], audio_file)
        
        if not success:
            print("Skipping segment due to audio failure.")
            continue
            
        await asyncio.sleep(1)
        
        # 2. Create Clip(s)
        try:
            audio_clip = AudioFileClip(audio_file)
            total_duration = audio_clip.duration + 0.5
            
            # Handle multiple images (e.g. "img1.png, img2.png")
            images = [img.strip() for img in seg['image'].split(',')]
            num_images = len(images)
            duration_per_image = total_duration / num_images
            
            segment_clips = []
            for img_path in images:
                if not os.path.exists(img_path):
                    print(f"  WARNING: Image {img_path} not found. Using Placeholder.")
                    # Fallback or error? For now, skip
                    continue
                    
                img_clip = ImageClip(img_path).set_duration(duration_per_image)
                img_clip = img_clip.crossfadein(0.2)
                segment_clips.append(img_clip)
            
            if segment_clips:
                # Concatenate images for this segment
                final_seg_clip = concatenate_videoclips(segment_clips, method="compose")
                final_seg_clip = final_seg_clip.set_audio(audio_clip)
                clips.append(final_seg_clip)
                
        except Exception as e:
            print(f"Error creating clip for segment {i}: {e}")
        
    if clips:
        print("Concatenating video clips...")
        # Method="compose" is crucial for handling variable sized frames from zoom
        final_video = concatenate_videoclips(clips, method="compose")
        final_video.write_videofile(output_file, fps=24, threads=1)
        
        # Cleanup
        for i in range(len(segments)):
            try:
                os.remove(f"temp_vo_{i}.mp3")
            except:
                pass
        print(f"SUCCESS: Video generated at {output_file}")
    else:
        print("No clips generated.")

if __name__ == "__main__":
    segments = parse_transcript('voiceover-script.md')
    if segments:
        asyncio.run(create_video_async(segments))
    else:
        print("No segments found in transcript!")
