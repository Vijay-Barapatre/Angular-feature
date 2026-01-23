import os
import re

features_dir = r"d:\MyPOC\Angular\angular-features\src\app\features"
output_file = r"d:\MyPOC\Angular\angular-features\DOC_INDEX.md"

guides = []

for root, dirs, files in os.walk(features_dir):
    for file in files:
        if file.endswith("guide.md"):
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, features_dir)
            
            title = "No Title"
            try:
                with open(full_path, 'r', encoding='utf-8') as f:
                    for line in f:
                        if line.startswith("# "):
                            title = line.strip("# ").strip()
                            break
            except Exception as e:
                title = f"Error reading file: {e}"
            
            # Extract feature name from path
            parts = rel_path.split(os.sep)
            feature = parts[0] if parts else "Unknown"
            
            guides.append({
                "feature": feature,
                "title": title,
                "path": rel_path,
                "full_path": full_path
            })

# Sort by feature, then title
guides.sort(key=lambda x: (x['feature'], x['title']))

with open(output_file, 'w', encoding='utf-8') as f:
    f.write("# 📚 Angular Features Documentation Index\n\n")
    f.write("A central directory of all concept guides and use-case documentation.\n\n")
    
    current_feature = None
    for guide in guides:
        if guide['feature'] != current_feature:
            current_feature = guide['feature']
            f.write(f"\n## {current_feature.replace('-', ' ').title()}\n\n")
        
        # Link using absolute file path for the environment
        file_link = f"file:///{guide['full_path'].replace(os.sep, '/')}"
        f.write(f"- [{guide['title']}]({file_link})\n")

print(f"Index generated at: {output_file}")
