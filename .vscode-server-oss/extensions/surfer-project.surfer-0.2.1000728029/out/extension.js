"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const surferWaveformViewer_1 = require("./surferWaveformViewer");
function activate(context) {
    console.log('Surfer has been activated!');
    context.subscriptions.push(surferWaveformViewer_1.SurferWaveformViewerEditorProvider.register(context));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map