import os
import json
import yaml
from collections import defaultdict

def extract_combinations_from_yaml(file_path):
    """Extracts (opcode, funct3, funct7) combinations from a single YAML file."""
    combinations = []
    extension = None

    with open(file_path, 'r') as f:
        data = yaml.safe_load(f)

        # Assume file structure: {extension: [instructions]}
        for ext, instructions in data.items():
            extension = ext
            for instr in instructions:
                opcode = instr.get('opcode')
                funct3 = instr.get('funct3')
                funct7 = instr.get('funct7')

                # Only include if opcode is present
                if opcode:
                    combo = (opcode, funct3, funct7)
                    combinations.append((extension, combo))

    return combinations


def collect_all_combinations(yaml_dir):
    """Reads all YAML files in a directory and collects unique combinations grouped by extension."""
    all_combinations = defaultdict(set)

    for filename in os.listdir(yaml_dir):
        if filename.endswith('.yaml') or filename.endswith('.yml'):
            file_path = os.path.join(yaml_dir, filename)
            combos = extract_combinations_from_yaml(file_path)
            for ext, combo in combos:
                all_combinations[ext].add(combo)

    # Convert sets to sorted lists of dicts
    result = {}
    for ext, combo_set in all_combinations.items():
        result[ext] = [
            {'opcode': c[0], 'funct3': c[1], 'funct7': c[2]}
            for c in sorted(combo_set)
        ]

    return result


def main():
    yaml_dir = 'instructions'  # Directory with YAML files
    output_file = 'combinations.json'

    combinations = collect_all_combinations(yaml_dir)

    with open(output_file, 'w') as f:
        json.dump(combinations, f, indent=2)

    print(f"[✓] Extracted combinations saved to {output_file}")


if __name__ == '__main__':
    main()
