import os
import yaml
from collections import defaultdict

INSTRUCTION_DIR = "instructions"
OUTPUT_FILE = "opcode_frequencies.txt"

def collect_opcode_frequencies(yaml_dir):
    opcode_map = defaultdict(list)

    for filename in os.listdir(yaml_dir):
        if not filename.endswith(".yaml"):
            continue

        filepath = os.path.join(yaml_dir, filename)

        with open(filepath, "r") as file:
            data = yaml.safe_load(file)

        for ext, instructions in data.items():
            for instr in instructions:
                opcode = instr.get("opcode")
                mnemonic = instr.get("mnemonic") or instr.get("name")
                if opcode and mnemonic:
                   opcode_str = bin(opcode) if isinstance(opcode, int) else opcode
					opcode_map[opcode_str].append(mnemonic)


    return opcode_map

def save_opcode_frequencies(opcode_map, output_file):
    with open(output_file, "w") as f:
        for opcode, mnemonics in sorted(opcode_map.items()):
            f.write(f"{opcode} → {mnemonics}\n")

    print(f"✅ Opcode frequencies saved to '{output_file}'.")

def main():
    opcode_map = collect_opcode_frequencies(INSTRUCTION_DIR)
    save_opcode_frequencies(opcode_map, OUTPUT_FILE)

if __name__ == "__main__":
    main()
