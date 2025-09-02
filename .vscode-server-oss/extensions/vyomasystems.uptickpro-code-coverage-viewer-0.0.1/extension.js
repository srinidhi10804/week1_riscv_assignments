// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('uptickpro.code-coverage-viewer',  async function (uri) {
		// The code you place here will be executed every time your command is executed

		try {
			let fileUri;
            
            if (uri) {
                fileUri = uri;
            } else {
                const result = await vscode.window.showOpenDialog({
                    canSelectMany: false,
                    filters: {
                        'HTML files': ['html']
                    }
                });
                if (result && result[0]) {
                    fileUri = result[0];
                }	
            }
			if (fileUri) {
				const htmlPath = fileUri.fsPath;
				let htmlContent = fs.readFileSync(htmlPath, 'utf8');
				let htmlDir = path.dirname(htmlPath);

				const localResourceRoots = getLocalResourceRootsFromHtml(htmlContent, htmlDir);

				let updatedHtml = injectStyleinHtml(htmlContent)
				updatedHtml = addScriptTag(updatedHtml);
					
				const panel = vscode.window.createWebviewPanel(
						"CodeCoverage",
						"Code Coverage Viewer",
						vscode.ViewColumn.One,
						{ 
							enableScripts: true, // Enable JavaScript in the WebView
							localResourceRoots: localResourceRoots // Allow resources from the top directory
						} 
					);
				updatedHtml = replaceImgSrcTag(updatedHtml, htmlDir, panel);
				updatedHtml = replaceStyleTag(updatedHtml, htmlDir, panel);
				panel.webview.html = updatedHtml;

				panel.webview.onDidReceiveMessage(
						message => {
							switch (message.command) {
								case 'linkmessage':
							
									const uri = vscode.Uri.parse(message.url);
									let relativePath = uri.path; // Get the path component
	
									relativePath = relativePath.replace(panel.webview.asWebviewUri(vscode.Uri.file( __dirname)).path, ''); // Remove base path
								
									const finalpath = relativePath.startsWith('/') ? relativePath.substring(1) : relativePath;
									let finalpathDir = path.resolve(htmlDir, finalpath);
									
									let dirPath = path.dirname(finalpathDir);
									htmlDir=dirPath;
									let newContent = fs.readFileSync(finalpathDir, 'utf8');

									newContent = injectStyleinHtml(newContent)
									newContent = replaceImgSrcTag(newContent, htmlDir, panel);
									newContent = replaceStyleTag(newContent, htmlDir, panel);
									const updatedHtml = addScriptTag(newContent);

									panel.webview.html = updatedHtml;
									break;
							}
						},
						undefined,
						context.subscriptions
					);

			}

		}catch (error) {
            vscode.window.showErrorMessage(`Failed to parse coverage data: ${error.message}`);
        }

	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

function addScriptTag(htmlContent){
	return htmlContent.replace(/<\/body>/,
					
	`<script>
	const vscode = acquireVsCodeApi();
	document.querySelectorAll("a").forEach(link => {
		link.addEventListener("click", (event) => {
			const href = link.href; 
			let fullUrl = new URL(link.getAttribute("href"), window.location.href).href;
			let relativePath = link.getAttribute("href");
			alert(fullUrl);
			vscode.postMessage({ command: 'linkmessage', url: relativePath });
		});
	});
	</script></body>
	`);
}


function replaceStyleTag(htmlContent, htmlDir, panel){
return htmlContent.replace(/<link\s+rel=["']stylesheet["'](?:(?!type=["']text\/css["'])\s+.*?)?\s+href=["'](.*?)["']/g, (match, href) => {
	let cssUri = vscode.Uri.file(path.join(htmlDir, href));
	let webviewUri = panel.webview.asWebviewUri(cssUri);
	return `<link rel="stylesheet" href="${webviewUri}"`;
});

}

function replaceImgSrcTag(htmlContent, htmlDir, panel){
	return htmlContent.replace(/<img\s+src=["'](.*?)["']/g, (match, src) => {
		let imgUri = vscode.Uri.file(path.join(htmlDir, src));
		let webviewUri = panel.webview.asWebviewUri(imgUri);
		return `<img src="${webviewUri}"`;
	});

}

function injectStyleinHtml(htmlContent){

	const cssContent = `<style>td.coverBarOutline
						{
						display: flex;
						background-color: #000000;
						}</style>\n
						</head>`
	return htmlContent.replace('</head>', cssContent);
}

function getLocalResourceRootsFromHtml(htmlContent, baseDir) {
    const linkRegex = /<link\s+rel=["']stylesheet["']\s+type=["']text\/css["']\s+href=["'](.*?)["']/g;
    let match;
    let resourceRoots = new Set();

    while ((match = linkRegex.exec(htmlContent)) !== null) {
        const href = match[1];
        // Count how many levels up the path goes
        const upLevels = (href.match(/\.\.\//g) || []).length;

        // Resolve the folder up to the correct level
        const allowedDir = path.resolve(baseDir, '../'.repeat(upLevels));
        resourceRoots.add(vscode.Uri.file(allowedDir));
    }
    return Array.from(resourceRoots);
}