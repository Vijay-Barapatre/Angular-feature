import os
import re

features_dir = r"d:\MyPOC\Angular\angular-features\src\app\features"

# Improved Regex for "Use Case X" variants including ranges and multiple numbers
# Matches: "Use Case 1", "Use Case 4-7", "Use Case 1 & 2", "USE CASE 1:", etc.
uc_pattern = r'(?i)Use Case\s+\d+([\s&\-,\d]+)?[:\-\s]*\s*'

def process_file(file_path):
    try:
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except UnicodeDecodeError:
            with open(file_path, 'r', encoding='latin-1') as f:
                content = f.read()
            
        new_content = re.sub(uc_pattern, '', content)
        
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return True
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
    return False

# Files to process
file_exts = ['.ts', '.html', '.md']
count = 0

for root, dirs, files in os.walk(features_dir):
    for file in files:
        if any(file.endswith(ext) for ext in file_exts):
            full_path = os.path.join(root, file)
            if process_file(full_path):
                count += 1

print(f"Refactoring complete. Total files modified: {count}")
