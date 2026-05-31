import os
import re

def replace_colors(directory):
    color_map = {
        r'(?i)#1A365D': '#1B4332',
        r'(?i)#0F172A': '#0F2D1E',
        r'(?i)#718096': '#2D6A4F',
        r'(?i)#475569': '#40916C',
        r'(?i)#E2E8F0': '#D8F3DC',
        r'(?i)#F1F5F9': '#F7F9F7',
        r'(?i)#4A5568': '#2D6A4F',
        r'(?i)#1E293B': '#1B4332',
        r'(?i)#334155': '#2D6A4F',
        r'(?i)#F8FAFC': '#FFFFFF',
    }
    
    for root, dirs, files in os.walk(directory):
        if 'node_modules' in root or '.next' in root:
            continue
        for file in files:
            if file.endswith(('.tsx', '.ts', '.css', '.js', '.jsx')):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = content
                    for old_color, new_color in color_map.items():
                        new_content = re.sub(old_color, new_color, new_content)
                    
                    if new_content != content:
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated {filepath}")
                except Exception as e:
                    print(f"Failed {filepath}: {e}")

replace_colors(r'p:\nithish_project\code')
