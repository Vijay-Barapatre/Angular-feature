import os
import re

# Comprehensive mapping for all renamed features
MAPPINGS = {
    'input-output': {
        'use-case-1': 'basic-input-output',
        'use-case-2': 'complex-objects',
        'use-case-3': 'multiple-inputs-outputs',
        'use-case-4': 'input-setters',
        'use-case-5': 'custom-events',
        'use-case-6': 'two-way-binding',
        'use-case-7': 'input-transforms'
    },
    'signals': {
        'use-case-1': 'basic-signals',
        'use-case-2': 'computed-signals',
        'use-case-3': 'effects',
        'use-case-4': 'signal-inputs',
        'use-case-5': 'model-signals',
        'use-case-6': 'signals-vs-observables'
    },
    'services-di': {
        'use-case-1': 'basic-service',
        'use-case-2': 'factory-providers',
        'use-case-3': 'injection-tokens',
        'use-case-4': 'resolution-modifiers',
        'use-case-5': 'service-scoping',
        'use-case-6': 'provided-in-hierarchy'
    },
    'viewchild-contentchild': {
        'use-case-1': 'basic-viewchild',
        'use-case-2': 'template-references',
        'use-case-3': 'viewchildren',
        'use-case-4': 'basic-contentchild',
        'use-case-5': 'contentchildren',
        'use-case-6': 'lifecycle-timing'
    },
    'guards': {
        'use-case-1': 'auth-guard',
        'use-case-2': 'deactivate-guard',
        'use-case-3': 'resolve-guard',
        'use-case-4': 'role-match'
    },
    'reactive-forms': {
        'use-case-1': 'basic-reactive',
        'use-case-2': 'nested-groups',
        'use-case-3': 'form-array',
        'use-case-4': 'built-in-validators',
        'use-case-5': 'custom-validators',
        'use-case-6': 'cross-field',
        'use-case-7': 'dynamic-form',
        'use-case-8': 'value-changes',
        'use-case-9': 'typed-forms',
        'use-case-10': 'signals-interop'
    },
    'lifecycle-hooks': {
        'use-case-1': 'on-init-on-destroy',
        'use-case-2': 'on-changes',
        'use-case-3': 'do-check',
        'use-case-4': 'after-view',
        'use-case-5': 'after-content'
    },
    'ngrx': {
        'use-case-1': 'store-basics',
        'use-case-2': 'effects-demo',
        'use-case-3': 'entity-adapter',
        'use-case-4': 'selectors-demo',
        'use-case-5': 'devtools-demo',
        'use-case-6': 'best-practices',
        'use-case-7': 'router-store-demo',
        'use-case-8': 'component-store-demo',
        'use-case-9': 'advanced-patterns'
    }
}

def fix_paths(content, current_feature):
    modified = False
    
    # 1. Broad replacement for paths that include the feature name
    for feature, mapping in MAPPINGS.items():
        for old, new in mapping.items():
            # Match [feature]/components/[old] or [feature]/[old]
            pattern = re.compile(rf'({feature}/(?:components/|))({old})(?=[/.\'"])')
            if pattern.search(content):
                content = pattern.sub(rf'\1{new}', content)
                modified = True

    # 2. Context-aware replacement for relative paths within the same feature
    if current_feature in MAPPINGS:
        mapping = MAPPINGS[current_feature]
        for old, new in mapping.items():
            # Match "./[old]" or "../[old]" or just "/[old]/"
            # We look for [old] preceded by a slash or dot and followed by a slash or quote
            pattern = re.compile(rf'(?<=[\/.\'"])({old})(?=[\/.\'"])')
            if pattern.search(content):
                content = pattern.sub(new, content)
                modified = True
                
    return content, modified

def main():
    base_dir = r'd:\MyPOC\Angular\angular-features\src'
    extensions = ('.ts', '.html', '.css', '.scss')
    
    total_files = 0
    updated_files = 0
    
    for root, dirs, files in os.walk(base_dir):
        # Determine the current feature from the path
        current_feature = None
        parts = root.split(os.sep)
        if 'features' in parts:
            feature_idx = parts.index('features')
            if feature_idx + 1 < len(parts):
                current_feature = parts[feature_idx + 1]

        for file in files:
            if file.endswith(extensions):
                total_files += 1
                file_path = os.path.join(root, file)
                
                try:
                    # Use utf-8 with fallback to latin-1 if needed
                    try:
                        with open(file_path, 'r', encoding='utf-8') as f:
                            content = f.read()
                    except UnicodeDecodeError:
                        with open(file_path, 'r', encoding='latin-1') as f:
                            content = f.read()
                    
                    new_content, modified = fix_paths(content, current_feature)
                    
                    if modified:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Updated: {file_path}")
                        updated_files += 1
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")
                    
    print(f"\nDone. Processed {total_files} files, updated {updated_files}.")

if __name__ == "__main__":
    main()
