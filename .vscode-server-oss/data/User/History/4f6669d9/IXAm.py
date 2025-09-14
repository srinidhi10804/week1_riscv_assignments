import os
import shutil

def copy_files_from_list(file_list, root_directory, output_directory):
    """
    Searches for files in the given root directory and copies them to new folders
    in the output directory. The folder name is the file name without the extension.

    :param file_list: List of filenames to search for
    :param root_directory: Directory to start searching from
    :param output_directory: Directory where new folders will be created to copy the files
    """
    # Create output directory if it doesn't exist
    os.makedirs(output_directory, exist_ok=True)

    for filename in file_list:
        # Flag to track if the file was found
        file_found = False

        # Search for the file in root_directory and subdirectories
        for root, dirs, files in os.walk(root_directory):
            print(f"Checking in directory: {root}")  # Debug print
            print(f"Files found: {files}")           # Debug print

            if filename in files:
                file_found = True
                file_path = os.path.join(root, filename)

                # Create a folder named after the file (without the extension)
                folder_name = os.path.splitext(filename)[0]
                folder_path = os.path.join(output_directory, folder_name)

                # Create the folder if it doesn't exist
                os.makedirs(folder_path, exist_ok=True)

                # Copy the file to the new folder
                shutil.copy(file_path, folder_path)
                print(f"Copied {filename} to {folder_path}")

                # Stop further searching after finding the first occurrence of the file
                break

        # If the file was not found, print a warning message
        if not file_found:
            print(f"Warning: {filename} not found in {root_directory}")

# Example usage:
file_list = ['copy_listed_files.py', 'my_archive.zip', 'corrupted.zip']
  # List of files to search for
root_directory = '/home/vsysuser/workspace/week2_riscv_assignments'  # Root directory to search in
output_directory = '/home/vsysuser/workspace/week2_riscv_assignments/output'  # Directory where folders will be created

copy_files_from_list(file_list, root_directory, output_directory)
