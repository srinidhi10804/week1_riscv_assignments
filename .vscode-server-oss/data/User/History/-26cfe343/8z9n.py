import os
import zipfile

def extract_zip_files_in_directory(directory):
    """
    Recursively searches for `.zip` files in the given directory and its subdirectories,
    and extracts them into the same directory.
    Skips corrupted `.zip` files.

    :param directory: Directory to start searching for `.zip` files
    """
    for root, dirs, files in os.walk(directory):
        for file in files:
            # Check if the file is a ZIP file
            if file.endswith('.zip'):
                zip_file_path = os.path.join(root, file)
                try:
                    # Attempt to open the ZIP file
                    with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
                        # Extract all the contents into the same directory
                        zip_ref.extractall(root)
                        print(f"Extracted {zip_file_path} successfully.")
                except zipfile.BadZipFile:
                    print(f"Skipping corrupted ZIP file: {zip_file_path}")
                except Exception as e:
                    print(f"An error occurred while processing {zip_file_path}: {e}")

# Example usage:
# Provide the path to the directory you want to start searching from.
directory_to_search = '/home/vsysuser/workspace/week2_riscv_assignments'
extract_zip_files_in_directory(directory_to_search)
