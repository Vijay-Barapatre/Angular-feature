import os
import re
from moviepy.editor import *
import PIL.Image

# COMPATIBILITY PATCH: Fix for Pillow 10+ where ANTIALIAS is removed
if not hasattr(PIL.Image, 'ANTIALIAS'):
    PIL.Image.ANTIALIAS = PIL.Image.LANCZOS

TRANSCRIPT_FILE = 'voiceover-script.md'
AUDIO_SOURCE_FILE = 'input_output_tutorial_camp.mp4'
OUTPUT_FILE = 'input_output_tutorial_final.mp4'

def time_to_seconds(time_str):
    """Converts 'M:SS' or 'H:MM:SS' string to seconds (float)."""
    try:
        parts = time_str.strip().split(':')
        if len(parts) == 2:
            return int(parts[0]) * 60 + int(parts[1])
        elif len(parts) == 3:
            return int(parts[0]) * 3600 + int(parts[1]) * 60 + int(parts[2])
    except ValueError:
        pass
    return 0.0

def parse_transcript_timings(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    segments = []
    # Regex to split by frames
    blocks = re.split(r'## (?:Frame|Segment)', content)
    
    for block in blocks[1:]: # Skip header
        # Extract Image path
        img_match = re.search(r'\*\*Image(?: to use)?:\*\*\s*`?([^`\n\r]+)`?', block)
        
        # Extract Timing: e.g. "0:00 – 0:07"
        # Note: The separator might be a hyphen -, en-dash –, or em-dash —
        timing_match = re.search(r'\*\*Timing:\*\*\s*(\d+:\d+)\s*[–-—]\s*(\d+:\d+)', block)
        
        if img_match and timing_match:
            img_path = img_match.group(1).strip()
            start_str = timing_match.group(1)
            end_str = timing_match.group(2)
            
            start_sec = time_to_seconds(start_str)
            end_sec = time_to_seconds(end_str)
            
            # Handle v2_final path correction if needed
            if not os.path.exists(img_path) and os.path.exists(os.path.join("v2_final", img_path)):
                img_path = os.path.join("v2_final", img_path)
            elif not os.path.exists(img_path) and "v2_final/" in img_path:
                 # Check if we are already inside a related folder or need base path
                 pass

            segments.append({
                'image': img_path,
                'start': start_sec,
                'end': end_sec,
                'duration': end_sec - start_sec
            })
            
    return segments

def build_video():
    print(f"Reading transcript: {TRANSCRIPT_FILE}")
    segments = parse_transcript_timings(TRANSCRIPT_FILE)
    
    if not segments:
        print("No segments found in transcript!")
        return

    print(f"Found {len(segments)} segments with timings.")
    
    # 1. Load Audio
    if not os.path.exists(AUDIO_SOURCE_FILE):
        print(f"Audio source not found: {AUDIO_SOURCE_FILE}")
        return
        
    print(f"Extracting audio from: {AUDIO_SOURCE_FILE}")
    source_video = VideoFileClip(AUDIO_SOURCE_FILE)
    main_audio = source_video.audio
    
    clips = []
    
    for i, seg in enumerate(segments):
        img_path = seg['image']
        duration = seg['duration']
        
        if not os.path.exists(img_path):
            print(f"Warning: Image not found {img_path}, skipping segment.")
            continue
            
        print(f"Segment {i+1}: {img_path} ({seg['start']}s -> {seg['end']}s, dur={duration}s)")
        
        # Create Image Clip
        img_clip = ImageClip(img_path).set_duration(duration)
        img_clip = img_clip.set_start(seg['start'])
        img_clip = img_clip.crossfadein(0.2) # Smooth entry
        
        clips.append(img_clip)

    if clips:
        print("Concatenating video clips...")
        # Concatenate
        final_video = concatenate_videoclips(clips, method="compose")
        
        # Set Audio
        # We assume the transcript timing matches the audio file length logically.
        # If the audio is longer/shorter, we might need to trim or just let it play.
        # For safety, let's trim audio to video duration or vice-versa? 
        # Usually better to set audio to video duration to avoid silent tail or cutoff.
        
        # However, since the timings are EXPLICITLY derived from the transcript which matches the audio,
        # we should just overlay the full audio.
        
        # Optimization: Cut extracted audio to match total calculated duration to be clean
        total_calc_duration = segments[-1]['end']
        print(f"Total calculated duration: {total_calc_duration}s")
        
        if main_audio.duration < total_calc_duration:
             print(f"Warning: Audio ({main_audio.duration}s) is shorter than video ({total_calc_duration}s).")
        
        final_audio = main_audio.subclip(0, min(main_audio.duration, total_calc_duration))
        
        final_video = final_video.set_audio(final_audio)
        
        print(f"Writing to {OUTPUT_FILE}...")
        final_video.write_videofile(OUTPUT_FILE, fps=24, threads=4, audio_codec='aac')
        print("Done!")
    else:
        print("No clips created.")

if __name__ == "__main__":
    build_video()
