pwd
cd ~
mkdir -p workspace/week4_riscv/instructions
cd workspace/week4_riscv
code list_combinations.py
cat > instructions/rv32i.yaml << EOF
RV32I:
  - name: ADD
    opcode: 0b0110011
    funct3: 0b000
    funct7: 0b0000000

  - name: SUB
    opcode: 0b0110011
    funct3: 0b000
    funct7: 0b0100000
EOF

cat > instructions/rv32m.yaml << EOF
RV32M:
  - name: MUL
    opcode: 0b0110011
    funct3: 0b000
    funct7: 0b0000001

  - name: DIV
    opcode: 0b0110011
    funct3: 0b100
    funct7: 0b0000001
EOF

ls
pyenv rehash
python list_combinations.py
    funct7: 0b0000001
EOF
ls
python list_combinations.py
mkdir -p workspace/week1_assi5_riscv/instructions
cd workspace/week1_assi5_riscv
code opcode_frequencies.py
cat > instructions/rv32i.yaml << EOF
RV32I:
  - name: ADD
    mnemonic: ADD
    opcode: 0b0110011
    funct3: 0b000
    funct7: 0b0000000

  - name: SUB
    mnemonic: SUB
    opcode: 0b0110011
    funct3: 0b000
    funct7: 0b0100000
EOF

cat > instructions/rv32m.yaml << EOF
RV32M:
  - name: MUL
    mnemonic: MUL
    opcode: 0b0110011
    funct3: 0b000
    funct7: 0b0000001

  - name: DIV
    mnemonic: DIV
    opcode: 0b0110011
    funct3: 0b100
    funct7: 0b0000001
EOF

code opcode_frequencies.txt
rm opcode_frequencies.txt
python opcode_frequencies.py
cat opcode_frequencies.txt
pyenv rehash
cd ~
mkdir -p workspace/week1_assi3_riscv/instructions
cd workspace/week1_assi3_riscv
code count_extensions.py
cat > instructions/rv32i.yaml << EOF
RV32I:
  - name: ADD
    mnemonic: ADD
    opcode: 0b0110011

  - name: SUB
    mnemonic: SUB
    opcode: 0b0110011
EOF

cat > instructions/rv32m.yaml << EOF
RV32M:
  - name: MUL
    mnemonic: MUL
    opcode: 0b0110011

  - name: DIV
    mnemonic: DIV
    opcode: 0b0110011

  - name: REM
    mnemonic: REM
    opcode: 0b0110011
EOF

python count_extensions.py
    opcode: 0b0110011
  - name: REM
    mnemonic: REM
    opcode: 0b0110011
EOF
python count_extensions.py
pwd
la
code print_opcodes.py
cd ~/workspace/week1_assi1_riscv
ls
cat > opcodes/test_bulk.yaml << EOF
- mnemonic: ADD
- mnemonic: SUB
- mnemonic: MUL
- mnemonic: DIV
- mnemonic: REM
- mnemonic: AND
- mnemonic: OR
- mnemonic: XOR
- mnemonic: SLL
- mnemonic: SRL
- mnemonic: SRA
- mnemonic: SLT
- mnemonic: SLTU
- mnemonic: LUI
- mnemonic: AUIPC
- mnemonic: JAL
- mnemonic: JALR
- mnemonic: BEQ
- mnemonic: BNE
- mnemonic: BLT
- mnemonic: BGE
EOF

python print_opcodes.py
cat all_opcodes.txt
git config --global user.name "srinidhi10804"
git config --global user.email "srinidhi1804@gmail.com"
git clone https://github.com/srinidhi10804/week1_riscv_assignments
- mnemonic: ADD
- mnemonic: SUB
- mnemonic: MUL
- mnemonic: DIV
- mnemonic: REM
- mnemonic: AND
- mnemonic: OR
- mnemonic: XOR
- mnemonic: SLL
- mnemonic: SRL
- mnemonic: SRA
- mnemonic: SLT
- mnemonic: SLTU
- mnemonic: LUI
- mnemonic: AUIPC
- mnemonic: JAL
- mnemonic: JALR
- mnemonic: BEQ
- mnemonic: BNE
- mnemonic: BLT
- mnemonic: BGE
EOF
python print_opcodes.py
cat all_opcodes.txt
git clone https://github.com/srinidhi10804/week1_riscv_assignments
git remote add origin https://github.com/srinidhi10804/week1_riscv_assignments
git add.
git config --global user.name "srinidhi10804"
git config --global user.email "srinidhi1804@gmail.com"
git commit -m "Add all 5 RISC-V assignments with all files"
git branch
git branch -M main
git push -u origin main
python --version
cd /home/vsysuser/workspace
cd workspace
cd week2_riscv_assignments
mkdir /home/vsysuser/workspace/week2_riscv_assignments
code .
Compress-Archive -Path * -DestinationPath my_archive.zip
sudo apt install zip
zip -r my_archive.zip *
dd if=/dev/zero of=corrupted.zip bs=512 count=1
python extract_zip_files.py
cd ~/week2_riscv_assignments
git init
git remote add origin https://github.com/srinidhi10804/week2_riscv_assignments
git add .
git commit -m "Initial commit for ZIP extraction assignment"
git push -u origin master
ls -la
git add -A
git status
git ls-files
git diff
touch copy_listed_files.py
code copy_listed_files.py
python copy_listed_files.py
find /home/vsysuser/workspace/week2_riscv_assignments -name example1.txt
find /home/vsysuser/workspace/week2_riscv_assignments -name example2.py
find /home/vsysuser/workspace/week2_riscv_assignments -name image.png
pwd
ls
python3 copy_listed_files.py
cd /home/vsysuser/workspace/week2_riscv_assignments
nano copy_listed_files.py
sudo apt update
sudo apt install vim
vim copy_listed_files.py
ls
git add copy_listed_files.py
vim copy_listed_files.py
