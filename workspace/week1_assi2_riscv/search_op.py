import os
import re
import json
import argparse

OPCODES_DIR = "opcodes"
OUTPUT_FILE = "search.json"

def search_mnemonics(query, ignore_case=False, use_regex=False):
    results = []

    if use_regex:
        pattern = re.compile(query, re.IGNORECASE if ignore_case else 0)

    for filename in os.listdir(OPCODES_DIR):
        if not filename.endswith(".yaml"):
            continue

        filepath = os.path.join(OPCODES_DIR, filename)

        with open(filepath, "r") as file:
            lines = file.readlines()

        for i, line in enumerate(lines):
            if "mnemonic" not in line:
                continue

            match_found = False
            if use_regex:
                if pattern.search(line):
                    match_found = True
            elif ignore_case:
                if query.lower() in line.lower():
                    match_found = True
            else:
                if query in line:
                    match_found = True

            if match_found:
                results.append({
                    "file": filename,
                    "line_number": i + 1,
                    "matched_line": line.strip()
                })

    with open(OUTPUT_FILE, "w") as out_file:
        json.dump(results, out_file, indent=2)

    print(f"✅ Found {len(results)} matches. Results saved to '{OUTPUT_FILE}'.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Search mnemonics in opcode YAML files.")
    parser.add_argument("query", help="Mnemonic or pattern to search")
    parser.add_argument("--ignore-case", action="store_true", help="Case-insensitive search")
    parser.add_argument("--regex", action="store_true", help="Enable regex pattern matching")

    args = parser.parse_args()

    search_mnemonics(args.query, args.ignore_case, args.regex)
