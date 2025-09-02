"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurferWaveformViewerEditorProvider = void 0;
const vscode = __importStar(require("vscode"));
class Wavefile {
    uri;
    constructor(uri) {
        this.uri = uri;
    }
    dispose() { }
}
class SurferWaveformViewerEditorProvider {
    context;
    static register(context) {
        const provider = new SurferWaveformViewerEditorProvider(context);
        const providerRegistration = vscode.window.registerCustomEditorProvider(SurferWaveformViewerEditorProvider.viewType, provider, {
            webviewOptions: {
                retainContextWhenHidden: true,
            },
        });
        return providerRegistration;
    }
    static viewType = 'surfer.waveformViewer';
    constructor(context) {
        this.context = context;
    }
    async openCustomDocument(uri, _openContext, _token) {
        return new Wavefile(uri);
    }
    async resolveCustomEditor(document, webviewPanel, _token) {
        // Add the folder that the document lives in as a localResourceRoot
        const uriString = document.uri.toString();
        // TODO: this probably doesn't play well with windows
        const dirPath = uriString.substring(0, uriString.lastIndexOf('/'));
        webviewPanel.webview.options = {
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.joinPath(this.context.extensionUri, 'surfer'),
                vscode.Uri.parse(dirPath, true),
            ],
        };
        webviewPanel.webview.html = await this.getHtmlForWebview(webviewPanel.webview);
        const documentUri = webviewPanel.webview.asWebviewUri(document.uri).toString();
        webviewPanel.webview.onDidReceiveMessage((message) => {
            switch (message.command) {
                case 'loaded': {
                    console.log("Surfer got the loaded message from the web view");
                    webviewPanel.webview.postMessage({ command: "LoadUrl", url: documentUri });
                    break;
                }
                default: {
                    console.log(`Got unexpected command (${message.command}) from surfer web view`);
                }
            }
        });
    }
    // Get the static html used for the editor webviews.
    async getHtmlForWebview(webview) {
        // Read index.html from disk
        const indexPath = vscode.Uri.joinPath(this.context.extensionUri, 'surfer', 'index.html');
        const contents = await vscode.workspace.fs.readFile(indexPath);
        // Replace local paths with paths derived from WebView URIs
        let html = new TextDecoder().decode(contents);
        const translate_url = (path, in_html) => {
            const uriString = webview
                .asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, ...path))
                .toString();
            html = this.replaceAll(html, `["']${in_html}['"]`, `"${uriString}"`);
        };
        translate_url(["surfer", "manifest.json"], "/manifest.json");
        translate_url(["surfer", "surfer_bg.wasm"], "/surfer_bg.wasm");
        translate_url(["surfer", "surfer.js"], "/surfer.js");
        translate_url(["surfer", "sw.js"], "/sw.js");
        translate_url(["surfer", "integration.js"], "integration.js");
        // We need to wait until the new HTML has loaded before we can start injecting messages.
        // To detect this, we'll add a script at the every end of the html that sends a message
        // back to the host saying that the HTML is loaded.
        // A hacky but working way of doing this is to replace the </body> tag with a script
        // and a new </body> tag
        const load_notifier = `
        (function() {
            const vscode = acquireVsCodeApi();

            vscode.postMessage({
                command: 'loaded',
            })
        }())`;
        html = html.replaceAll("/*SURFER_SETUP_HOOKS*/", `${load_notifier}`);
        return html;
    }
    replaceAll(input, search, replacement) {
        return input.replace(new RegExp(search, 'g'), replacement);
    }
}
exports.SurferWaveformViewerEditorProvider = SurferWaveformViewerEditorProvider;
//# sourceMappingURL=surferWaveformViewer.js.map