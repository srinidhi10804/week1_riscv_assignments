# Functional Coverage Viewer for VS Code

This VS Code extension provides integration for the Functional coverage viewer within Visual Studio Code. It allows you to view XML coverage data files in an interactive metrics table format using PyQt5-based GUI.

## Features

- **In-Editor Visualization**: View coverage data directly within VS Code
- **Tree View Display**: Hierarchical view of coverage data showing covergroups, coverpoints, and bins
- **Interactive UI**: Collapsible tree structure with coverage percentage bars
- **Visual Coverage Indicators**: Blue progress bars showing coverage percentages
- **Real-time Updates**: Reload button to refresh coverage data when files change
- **Native Integration**: Follows VS Code's design patterns and user experience

## Installation

### Installing from VSIX
1. Download the `.vsix` file from the releases page
2. Open VS Code
3. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)
4. Type "Install from VSIX" and select the command
5. Choose the downloaded `.vsix` file

### Building from Source

To build the extension from source, follow these steps:

1. **Prerequisites**
   - Node.js (version 14 or higher)
   - npm (usually comes with Node.js)
   - Visual Studio Code
   - Git

2. **Clone the Repository**
   ```bash
   git clone https://gitlab.com/vyoma_projects/saas/vscode_extns/functional_cov_viewer.git
   cd functional_cov_viewer
   ```

3. **Install Dependencies**
   ```bash
   sudo apt-get install npm
   ```

4. **Install Required Tools**
   ```bash
   npm install -g vsce
   ```

5. **Build the VSIX Package**
   ```bash
   vsce package
   ```
   This will create a `.vsix` file in the current directory.

6. **Install the Extension**
   - In VS Code, press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)
   - Type "Install from VSIX"
   - Select the generated `.vsix` file

7. **Development**
   - Open the project in VS Code
   - Press F5 to start debugging
   - This will open a new VS Code window with the extension loaded
   - Make changes and press F5 to reload

## Usage

There are two ways to open XML files with Functional Coverage Viewer:

1. Right-click on any XML file in the VS Code explorer and select "Open with Functional Coverage Viewer"
2. Use the command palette (Ctrl+Shift+P / Cmd+Shift+P):
   - Type "Open Functional Coverage Viewer"
   - Select an XML file when prompted
   - The viewer will open in a new window showing your coverage data

## Requirements

- Visual Studio Code 1.85.0 or higher
- Python 3.x
- PyUCIS package
- PyQt5 package
- X11 display server (for Linux)

## Troubleshooting


1. If you see an error about PyQt5:
   ```bash
   python3 -m pip install PyQt5
   ```

2. If you see an error about missing dependencies:
   ```bash
   python3 -m pip install pyucis PyQt5
   ```

3. On Linux, make sure you have an X11 display server running:
   - If using WSL2, install an X server like VcXsrv on Windows
   - Set the DISPLAY environment variable: `export DISPLAY=:0`

## Comprehensive Documentation

### Functional Coverage Viewer for VS Code

A Visual Studio Code extension for viewing functional coverage data directly within your editor. This extension allows you to visualize and analyze coverage information from XML files.

#### Features

- **In-Editor Visualization**: View coverage data directly within VS Code
- **Tree View Display**: Hierarchical view of coverage data showing covergroups, coverpoints, and bins
- **Interactive UI**: Collapsible tree structure with coverage percentage bars
- **Visual Coverage Indicators**: Blue progress bars showing coverage percentages
- **Real-time Updates**: Reload button to refresh coverage data when files change
- **Native Integration**: Follows VS Code's design patterns and user experience

#### Installation

1. Download the `.vsix` file from the releases page
2. Open VS Code
3. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)
4. Type "Install from VSIX" and select the command
5. Choose the downloaded `.vsix` file

#### Usage

There are several ways to open a coverage file:

1. **From Command Palette**:
   - Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)
   - Type "Open Functional Coverage Viewer"
   - Select a coverage XML file when prompted

2. **From File Explorer**:
   - Right-click on a `.xml` file
   - Select "Open with Functional Coverage Viewer"

3. **From Editor Title Menu**:
   - Open a `.xml` file
   - Click the "Open with Functional Coverage Viewer" button in the editor title bar

#### Features

The viewer displays:
- Coverage groups with overall coverage percentage
- Individual coverpoints with their coverage metrics
- Bins with hit counts and coverage status
- Visual progress bars for coverage indication
- Reload button to refresh coverage data

#### Requirements

- Visual Studio Code version 1.85.0 or higher

#### Extension Settings

This extension contributes the following settings:

* `functional-coverage-viewer.openViewer`: Command to open the coverage viewer
* `functional-coverage-viewer.openFile`: Command to open a specific file in the viewer

#### Known Issues

Please report any issues on our GitLab repository.

#### Release Notes

### 0.0.9
- Updated to display the cross coverage bins.

### 0.0.8 
- Updated the dependencies to open in docker image 

### 0.0.7

- Fixed bug on displaying multiple covergroup data

### 0.0.6

- Fixed issues with loading XML files
- Fixed issues with showing coverage data
- Updated showing hit count on bin
- Updated showing coverage percentage on coverpoint

### 0.0.5

- Added a reload button to refresh coverage data. 
- Updated the README.md file
- Updated the license file
- Updated the extension name and branding
- Updated the repository links

### 0.0.4 

- Updated the license file
- Changed branding name
- Added reload button for real-time updates
- Updated repository links

### 0.0.3

- Fixed setup issues while installing using vsix

### 0.0.2

- Updated branding
- Improved UI with modern design
- Added tooltips and animations
- Enhanced coverage visualization

### 0.0.1

Initial release of Coverage Viewer for VS Code:
- Basic coverage visualization
- Tree view interface
- Coverage percentage calculation
- Interactive UI elements

## Contributing

For contributions and feedback, please visit our [GitLab repository](https://gitlab.com/vyoma_projects/saas/vscode_extns/functional_cov_viewer).

## License

This extension is licensed under the [Vyoma Systems License](https://gitlab.com/vyoma_systems/common/-/blob/main/LICENSE.vyoma)
