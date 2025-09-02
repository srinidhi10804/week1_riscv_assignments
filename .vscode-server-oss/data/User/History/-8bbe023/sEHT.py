import os
import yaml

OPCODES_DIR = "opcodes"
OUTPUT_FILE = "all_opcodes.txt"

def extract_all_mnemonics(opcode_dir):
    mnemonics = set()

    for filename in os.listdir(opcode_dir):
        if not filename.endswith(".yaml"):
            continue

        filepath = os.path.join(opcode_dir, filename)

        with open(filepath, "r") as file:
            data = yaml.safe_load(file)

        if isinstance(data, list):  # Expected format: list of instructions
            for instr in data:
                mnemonic = instr.get("mnemonic") or instr.get("name")
                if mnemonic:
                    mnemonics.add(mnemonic)

    return sorted(mnemonics)

def save_mnemonics_to_file(mnemonics, output_file):
    with open(output_file, "w") as f:
        for mnemonic in mnemonics:
            f.write(f"{mnemonic}\n")

    print(f"✅ Saved {len(mnemonics)} mnemonics to '{output_file}'.")

def main():
    mnemonics = extract_all_mnemonics(OPCODES_DIR)
    save_mnemonics_to_file(mnemonics, OUTPUT_FILE)

if __name__ == "__main__":
    main()
