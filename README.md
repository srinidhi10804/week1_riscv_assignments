WEEK 1 WORKS 
Linux Commands Tried:
//Assignment 1 : Print All Opcodes
cd ~ mkdir -p workspace/print_opcodes/opcodes cd workspace/print_opcodes code print_opcodes.py python3 print_opcodes.py cat all_opcodes.txt

//Assignment 2 : Opcode Search
cd ~ mkdir -p workspace/search_opcodes/opcodes cd workspace/search_opcodes code search_op.py python3 search_op.py add --ignore-case cat search.json python3 search_op.py mul --ignore-case python3 search_op.py sub python3 search_op.py "^D" --ignore-case --regex

//Assignment 3: Count instructions per extension
cd ~ mkdir -p workspace/count_extensions/opcodes cd workspace/count_extensions code count_extensions.py python3 count_extensions.py cat extension_counts.csv

//Assignment 4: List Unique Combinations
cd ~ mkdir -p workspace/list_combinations/opcodes cd workspace/list_combinations code list_combinations.py python3 list_combinations.py cat combinations.json

//Assignment 5: Instruction frequency by opcode value
cd ~ mkdir -p workspace/opcode_frequencies/opcodes cd workspace/opcode_frequencies code opcode_frequencies.py python3 opcode_frequencies.py cat opcode_frequencies.txt

Git Commands Tried :
git config --global user.name "srinidhi10804" 
git config --global user.email "srinidhi1804@gmail.com" 
git init git remote add origin https://github.com/srinidhi10804/week1_riscv_assignments.git 
git remote -v git add . git commit -m "Add all RISC V Assignments with all files"
git push -u origin main git status git log --oneline

