# uptickpro-code-coverage-viewer README

UpTickPro-Code Coverage Viewer is a VS Code extension designed for UpTickPro IDE that allows users to view code coverage HTML reports directly within the editor. It processes coverage reports, properly links CSS and image files, and ensures seamless navigation within the report.

## Features

* View Code Coverage Reports – Open and inspect HTML-based code coverage reports directly within VS Code.

*  Proper CSS & Image Rendering – Ensures stylesheets and images are correctly linked and displayed inside the webview.

* Seamless Navigation – Clickable links within the report allow smooth transitions between different coverage files.

* Automatic Resource Access – Dynamically grants access to required CSS, JavaScript, and image files, even when they are nested in deep directories.

* Optimized for UpTickPro IDE – Specifically designed to integrate with UpTickPro, enhancing the debugging experience for developers.

* Lightweight & Fast – Provides a minimal performance overhead while rendering complex coverage reports efficiently. 🚀

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
   git clone https://gitlab.com/vyoma_projects/saas/vscode_extns.git
   cd uptickpro-code-coverage-viewer

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

There are two ways to open HTML files with Code Coverage Viewer:

1. Right-click on any XML file in the VS Code explorer and select "UpTickPro-Code coverage viewer"
2. Use the command palette (Ctrl+Shift+P / Cmd+Shift+P):
   - Type "UpTickPro-Code coverage viewer"
   - Select an HTML file when prompted
   - The viewer will open in a new window showing your coverage data



If you have any requirements or dependencies, add a section describing those and how to install and configure them.



## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0


---

