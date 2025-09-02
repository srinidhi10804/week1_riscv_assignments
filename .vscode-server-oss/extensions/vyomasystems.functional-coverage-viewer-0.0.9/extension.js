const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const xml2js = require('xml2js');

let currentPanel = undefined;
let currentFileUri = undefined;

function activate(context) {
    console.log('Activating Functional Coverage Viewer extension...');

    let disposable = vscode.commands.registerCommand('pyucis-viewer.openViewer', async function (uri) {
        try {
            let fileUri;
            
            if (uri) {
                fileUri = uri;
            } else {
                const result = await vscode.window.showOpenDialog({
                    canSelectMany: false,
                    filters: {
                        'XML files': ['xml']
                    }
                });
                
                if (result && result[0]) {
                    fileUri = result[0];
                }
            }

            if (fileUri) {
                currentFileUri = fileUri;
                const xmlContent = await fs.promises.readFile(fileUri.fsPath, 'utf8');
                const parser = new xml2js.Parser();
                const result = await parser.parseStringPromise(xmlContent);

                if (currentPanel) {
                    currentPanel.dispose();
                }

                currentPanel = vscode.window.createWebviewPanel(
                    'coverageViewer',
                    'Coverage View',
                    vscode.ViewColumn.One,
                    {
                        enableScripts: true
                    }
                );

                currentPanel.webview.html = getWebviewContent(result);

                currentPanel.webview.onDidReceiveMessage(
                    async message => {
                        switch (message.command) {
                            case 'reload':
                                try {
                                    const newXmlContent = await fs.promises.readFile(currentFileUri.fsPath, 'utf8');
                                    const newResult = await parser.parseStringPromise(newXmlContent);
                                    currentPanel.webview.html = getWebviewContent(newResult);
                                } catch (error) {
                                    vscode.window.showErrorMessage(`Failed to reload data: ${error.message}`);
                                }
                                break;
                        }
                    },
                    undefined,
                    context.subscriptions
                );

                currentPanel.onDidDispose(
                    () => {
                        currentPanel = undefined;
                        currentFileUri = undefined;
                    },
                    null,
                    context.subscriptions
                );
            }
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to parse coverage data: ${error.message}`);
        }
    });

    context.subscriptions.push(disposable);
}

function generateCoverageTree(data) {
    let html = '';
    
    if (data.UCIS && data.UCIS.instanceCoverages) {
        const instances = Array.isArray(data.UCIS.instanceCoverages) ? data.UCIS.instanceCoverages : [data.UCIS.instanceCoverages];
        instances.forEach(instance => {
            if (instance.covergroupCoverage) {
                const covergroupCoverages = Array.isArray(instance.covergroupCoverage) ? 
                    instance.covergroupCoverage : [instance.covergroupCoverage];
                
                covergroupCoverages.forEach(covergroupCoverage => {
                    const cgInstances = Array.isArray(covergroupCoverage.cgInstance) ? 
                        covergroupCoverage.cgInstance : [covergroupCoverage.cgInstance];
                    
                    cgInstances.forEach(cg => {
                        if (!cg) return;
                        
                        const coverpoints = Array.isArray(cg.coverpoint) ? cg.coverpoint : (cg.coverpoint ? [cg.coverpoint] : []);
                        const crosses = Array.isArray(cg.cross) ? cg.cross : (cg.cross ? [cg.cross] : []);
                        
                        // Calculate total coverage as average of coverpoint and cross coverages
                        let totalCoverage = 0;
                        let numItems = 0;
                        
                        // Calculate coverpoint coverage
                        coverpoints.forEach(cp => {
                            if (!cp || !cp.coverpointBin) return;
                            
                            const bins = Array.isArray(cp.coverpointBin) ? cp.coverpointBin : [cp.coverpointBin];
                            const totalBins = bins.length;
                            const coveredBins = bins.filter(bin => {
                                const count = parseInt(bin.range[0].contents[0].$.coverageCount) || 0;
                                return count > 0;
                            }).length;
                            
                            const cpCoverage = totalBins > 0 ? (coveredBins / totalBins * 100) : 0;
                            totalCoverage += cpCoverage;
                            numItems++;
                        });
                        
                        // Calculate cross coverage
                        crosses.forEach(cross => {
                            if (!cross || !cross.crossBin) return;
                            
                            const bins = Array.isArray(cross.crossBin) ? cross.crossBin : [cross.crossBin];
                            const totalBins = bins.length;
                            const coveredBins = bins.filter(bin => {
                                const count = parseInt(bin.contents[0].$.coverageCount) || 0;
                                return count > 0;
                            }).length;
                            
                            const crossCoverage = totalBins > 0 ? (coveredBins / totalBins * 100) : 0;
                            totalCoverage += crossCoverage;
                            numItems++;
                        });
                        
                        // Calculate average coverage
                        const coverage = numItems > 0 ? (totalCoverage / numItems) : 0;
                        
                        html += `
                            <div class="tree-item">
                                <div class="name">
                                    <span class="arrow"></span>
                                    <span class="type-icon">📊</span>
                                    TYPE: ${cg.cgId[0].$.cgName}
                                </div>
                                <div class="percentage">${coverage.toFixed(2)}%</div>
                                <div class="coverage-bar">
                                    <div class="coverage-bar-fill" style="width: ${coverage}%"></div>
                                </div>
                            </div>
                            <div class="tree-content">
                        `;
                        
                        // Generate coverpoint content
                        coverpoints.forEach(cp => {
                            if (!cp || !cp.coverpointBin) return;
                            
                            const bins = Array.isArray(cp.coverpointBin) ? cp.coverpointBin : [cp.coverpointBin];
                            const totalBins = bins.length;
                            const coveredBins = bins.filter(bin => {
                                const count = parseInt(bin.range[0].contents[0].$.coverageCount) || 0;
                                return count > 0;
                            }).length;
                            
                            const cpCoverage = totalBins > 0 ? (coveredBins / totalBins * 100) : 0;
                            
                            html += `
                                <div class="tree-item child-item">
                                    <div class="name">
                                        <span class="arrow"></span>
                                        <span class="type-icon">📍</span>
                                        CVP: ${cp.$.name}
                                    </div>
                                    <div class="percentage">${cpCoverage.toFixed(2)}%</div>
                                    <div class="coverage-bar">
                                        <div class="coverage-bar-fill" style="width: ${cpCoverage}%"></div>
                                    </div>
                                </div>
                                <div class="tree-content">
                            `;
                            
                            // Generate bin content
                            bins.forEach(bin => {
                                if (!bin) return;
                                
                                const hits = parseInt(bin.range[0].contents[0].$.coverageCount) || 0;
                                
                                html += `
                                    <div class="tree-item bin-item">
                                        <div class="name">
                                            <span class="type-icon">📌</span>
                                            ${bin.$.name}
                                        </div>
                                        <div class="percentage">${hits}</div>
                                        <div class="coverage-bar">
                                            <div class="coverage-bar-fill" style="width: ${hits > 0 ? 100 : 0}%"></div>
                                        </div>
                                    </div>
                                `;
                            });
                            
                            html += '</div>';
                        });
                        
                        // Generate cross content
                        crosses.forEach(cross => {
                            if (!cross || !cross.crossBin) return;
                            
                            const bins = Array.isArray(cross.crossBin) ? cross.crossBin : [cross.crossBin];
                            const totalBins = bins.length;
                            const coveredBins = bins.filter(bin => {
                                const count = parseInt(bin.contents[0].$.coverageCount) || 0;
                                return count > 0;
                            }).length;
                            
                            const crossCoverage = totalBins > 0 ? (coveredBins / totalBins * 100) : 0;
                            
                            html += `
                                <div class="tree-item child-item">
                                    <div class="name">
                                        <span class="arrow"></span>
                                        <span class="type-icon">🔄</span>
                                        CROSS: ${cross.$.name}
                                    </div>
                                    <div class="percentage">${crossCoverage.toFixed(2)}%</div>
                                    <div class="coverage-bar">
                                        <div class="coverage-bar-fill" style="width: ${crossCoverage}%"></div>
                                    </div>
                                </div>
                                <div class="tree-content">
                            `;
                            
                            // Generate cross bin content
                            bins.forEach(bin => {
                                if (!bin) return;
                                
                                const hits = parseInt(bin.contents[0].$.coverageCount) || 0;
                                
                                html += `
                                    <div class="tree-item bin-item">
                                        <div class="name">
                                            <span class="type-icon">📌</span>
                                            ${bin.$.name.replace(/[<>]/g, '').replace(',', ' x ')}
                                        </div>
                                        <div class="percentage">${hits}</div>
                                        <div class="coverage-bar">
                                            <div class="coverage-bar-fill" style="width: ${hits > 0 ? 100 : 0}%"></div>
                                        </div>
                                    </div>
                                `;
                            });
                            
                            html += '</div>';
                        });
                        
                        html += '</div>';
                    });
                });
            }
        });
    }
    
    return html || '<div class="tree-item"><div class="name">No coverage data found</div></div>';
}

function getWebviewContent(coverageData) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Functional Coverage Viewer</title>
        <style>
            body {
                padding: 0;
                margin: 0;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            }

            .app-header {
                background-color: #2196F3;
                color: white;
                padding: 1rem;
                position: sticky;
                top: 0;
                z-index: 100;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .app-title {
                margin: 0;
                font-size: 1.5rem;
            }

            .reload-button {
                background-color: white;
                color: #2196F3;
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
                cursor: pointer;
                font-weight: 500;
                transition: background-color 0.3s;
            }

            .reload-button:hover {
                background-color: #f0f0f0;
            }

            .container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 1rem;
            }

            .header {
                background-color: #f5f5f5;
                padding: 0.75rem 1rem;
                border-radius: 4px 4px 0 0;
                border: 1px solid #E0E0E0;
                display: grid;
                grid-template-columns: 300px 100px 1fr;
                gap: 1rem;
                font-weight: 600;
            }

            .tree-item {
                background-color: white;
                padding: 0.5rem 1rem;
                border: 1px solid #E0E0E0;
                border-top: none;
                display: grid;
                grid-template-columns: 300px 100px 1fr;
                gap: 1rem;
                align-items: center;
            }

            .tree-content {
                margin-left: 1.5rem;
                display: none;
            }

            .tree-content.show {
                display: block;
            }

            .coverage-bar {
                height: 20px;
                background-color: #E0E0E0;
                border-radius: 10px;
                overflow: hidden;
                position: relative;
                width: 200px;
            }

            .coverage-bar-fill {
                height: 100%;
                background-color: #2196F3;
                transition: width 0.3s ease-in-out;
            }

            .name {
                display: flex;
                align-items: center;
                font-weight: 500;
            }

            .arrow {
                display: inline-block;
                width: 20px;
                height: 20px;
                margin-right: 8px;
                position: relative;
                cursor: pointer;
            }

            .arrow::before {
                content: '';
                position: absolute;
                width: 8px;
                height: 8px;
                border-right: 2px solid #333;
                border-bottom: 2px solid #333;
                transform: rotate(-45deg);
                transition: transform 0.2s ease;
                top: 4px;
                left: 4px;
            }

            .arrow.expanded::before {
                transform: rotate(45deg);
                top: 2px;
            }

            .type-icon {
                margin-right: 8px;
            }

            .child-item {
                margin-left: 1.5rem;
            }

            .bin-item {
                margin-left: 3rem;
            }
        </style>
    </head>
    <body>
        <div class="app-header">
            <h1 class="app-title">Functional Coverage Viewer</h1>
            <button class="reload-button" onclick="reloadData()">Reload Data</button>
        </div>
        <div class="container">
            <div class="header">
                <div>Name</div>
                <div>Coverage</div>
                <div>Status</div>
            </div>
            ${generateCoverageTree(coverageData)}
        </div>
        <script>
            function reloadData() {
                const vscode = acquireVsCodeApi();
                vscode.postMessage({
                    command: 'reload'
                });
            }

            window.addEventListener('message', event => {
                const message = event.data;
                switch (message.command) {
                    case 'update':
                        window.location.reload();
                        break;
                }
            });

            document.addEventListener('click', function(e) {
                if (e.target.classList.contains('arrow') || e.target.closest('.arrow')) {
                    const arrow = e.target.classList.contains('arrow') ? e.target : e.target.closest('.arrow');
                    const item = arrow.closest('.tree-item');
                    const content = item.nextElementSibling;
                    
                    if (content && content.classList.contains('tree-content')) {
                        e.stopPropagation();
                        content.classList.toggle('show');
                        arrow.classList.toggle('expanded');
                    }
                }
            });

            // Initially expand the first level
            const firstArrow = document.querySelector('.tree-item .arrow');
            if (firstArrow) {
                const item = firstArrow.closest('.tree-item');
                const content = item.nextElementSibling;
                if (content && content.classList.contains('tree-content')) {
                    content.classList.add('show');
                    firstArrow.classList.add('expanded');
                }
            }
        </script>
    </body>
    </html>`;
}

function deactivate() {
    if (currentPanel) {
        currentPanel.dispose();
    }
}

module.exports = {
    activate,
    deactivate
};
