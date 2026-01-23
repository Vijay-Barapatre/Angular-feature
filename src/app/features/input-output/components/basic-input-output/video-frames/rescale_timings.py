import re

FILE_PATH = 'voiceover-script.md'
# Calculated from: 129.13 (Actual) / 190 (Script)
SCALE_FACTOR = 129.13 / 190.0

def seconds_to_str(seconds):
    """Converts seconds to M:SS format"""
    m = int(seconds // 60)
    s = int(seconds % 60)
    return f"{m}:{s:02d}"

def str_to_seconds(time_str):
    """Converts M:SS to seconds"""
    parts = time_str.split(':')
    return int(parts[0]) * 60 + int(parts[1])

def rescale_timings():
    with open(FILE_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    def replace_timing(match):
        start_str = match.group(1)
        end_str = match.group(2)
        
        start_sec = str_to_seconds(start_str)
        end_sec = str_to_seconds(end_str)
        
        new_start_sec = start_sec * SCALE_FACTOR
        new_end_sec = end_sec * SCALE_FACTOR
        
        # Calculate duration for the parenthesis (X s)
        duration = int(new_end_sec - new_start_sec)
        
        return f"**Timing:** {seconds_to_str(new_start_sec)} – {seconds_to_str(new_end_sec)} ({duration}s)"

    # Regex to find "**Timing:** 0:00 – 0:07 (7s)" pattern
    # Handles different dashes and spacing
    new_content = re.sub(
        r'\*\*Timing:\*\*\s*(\d+:\d+)\s*[–-—]\s*(\d+:\d+)\s*\(\d+s\)', 
        replace_timing, 
        content
    )
    
    # Update Total Duration header if present
    # "**Total Duration:** ~2 min 35 sec" -> update manually or ignore, let's just update the file body
    
    with open(FILE_PATH, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("Timings rescaled successfully.")

if __name__ == "__main__":
    rescale_timings()
