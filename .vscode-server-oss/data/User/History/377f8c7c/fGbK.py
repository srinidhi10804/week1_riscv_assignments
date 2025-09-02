import os
import yaml
import csv

INSTRUCTION_DIR = "instructions"
OUTPUT_FILE = "extension_counts.csv"

def count_instructions_per_extension(yaml_dir):
    extension_counts = {}

    for filename in os.listdir(yaml_dir):
        if not filename.endswith(".yaml"):
            continue

        filepath = os.path.join(yaml_dir, filename)

        with open(filepath, "r") as file:
            data = yaml.safe_load(file)

        for ext, instructions in data.items():
            count = len(instructions)
            if ext in extension_counts:
                extension_counts[ext] += count
            else:
                extension_counts[ext] = count

    return extension_counts

def save_counts_to_csv(extension_counts, output_file):
    with open(output_file, "w", newline="") as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(["Extension", "Instruction Count"])
        for ext, count in sorted(extension_counts.items()):
            writer.writerow([ext, count])

    print(f"✅ Instruction counts saved to '{output_file}'.")

def main():
    counts = count_instructions_per_extension(INSTRUCTION_DIR)
    save_counts_to_csv(counts, OUTPUT_FILE)

if __name__ == "__main__":
    main()
