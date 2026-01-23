import os
import re

features_dir = r"d:\MyPOC\Angular\angular-features\src\app\features"

def slugify(text):
    # Remove emojis and special characters for anchor links
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = text.strip().replace(' ', '-')
    return text

def generate_toc(content):
    lines = content.split('\n')
    toc = ["## 📋 Table of Contents"]
    headers_found = False
    
    for line in lines:
        # Match ## Header or ### Subheader
        match = re.match(r'^(##+)\s+(.*)', line)
        if match:
            level = len(match.group(1)) - 2 # 0 for ##, 1 for ###
            title = match.group(2).strip()
            # Clean title from existing markdown links if any
            clean_title = re.sub(r'\[(.*?)\]\(.*?\)', r'\1', title)
            anchor = slugify(clean_title)
            toc.append(f"{'  ' * level}- [{title}](#{anchor})")
            headers_found = True
            
    if not headers_found:
        return None
    return '\n'.join(toc)

def process_guide(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if "## 📋 Table of Contents" in content:
            # print(f"Skipping (already has TOC): {file_path}")
            return False

        toc_md = generate_toc(content)
        if not toc_md:
            return False

        # Insert TOC after the first H1 and its optional blockquote/intro
        lines = content.split('\n')
        new_lines = []
        inserted = False
        
        # Logic: find the first line starting with #
        # Then find the next empty line or end of blockquote
        h1_index = -1
        for i, line in enumerate(lines):
            if line.startswith('# '):
                h1_index = i
                break
        
        if h1_index == -1:
             # If no H1, just prepend
             new_content = toc_md + "\n\n---\n\n" + content
        else:
            # Look for where to insert
            insert_pos = h1_index + 1
            # Skip optional things like blockquotes or images right after H1
            while insert_pos < len(lines):
                line = lines[insert_pos].strip()
                if line.startswith('>') or line.startswith('!') or line == '':
                    insert_pos += 1
                else:
                    break
            
            new_lines = lines[:insert_pos]
            new_lines.append("\n" + toc_md + "\n\n---")
            new_lines.extend(lines[insert_pos:])
            new_content = '\n'.join(new_lines)

        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
    return False

count = 0
for root, dirs, files in os.walk(features_dir):
    for file in files:
        if file == "guide.md":
            full_path = os.path.join(root, file)
            if process_guide(full_path):
                count += 1

print(f"TOC Refactoring complete. Total files updated: {count}")
