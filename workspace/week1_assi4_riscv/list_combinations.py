import os
import json
import yaml
from collections import defaultdict

INSTRUCTION_DIR = "instructions"
OUTPUT_FILE = "combinations.json"

def extract_combinations_from_yaml(file_path):
    combinations = []
    with open(file_path, "r") as f:
        data = yaml.safe_load(f)
        for ext, instructions in data.items():
            for instr in instructions:
                opcode = instr.get("opcode")
                funct3 = instr.get("funct3")
                funct7 = instr.get("funct7")
                if opcode:
                    combinations.append((ext, opcode, funct3, funct7))
    return combinations

def collect_all_combinations(yaml_dir):
    all_combinations = defaultdict(set)

    for filename in os.listdir(yaml_dir):
        if not filename.endswith(".yaml"):
            continue
        file_path = os.path.join(yaml_dir, filename)
        combos = extract_combinations_from_yaml(file_path)
        for ext, opcode, funct3, funct7 in combos:
            all_combinations[ext].add((opcode, funct3, funct7))

    # Format for JSON output
    result = {}
    for ext, combo_set in all_combinations.items():
        result[ext] = [
            {
                "opcode": c[0],
                "funct3": c[1],
                "funct7": c[2]
            }
            for c in sorted(combo_set)
        ]

    return result

def main():
    combinations = collect_all_combinations(INSTRUCTION_DIR)
    with open(OUTPUT_FILE, "w") as f:
        json.dump(combinations, f, indent=2)
    print(f"✅ Extracted combinations saved to '{OUTPUT_FILE}'.")

if __name__ == "__main__":
    main()
