'use strict';
import * as vscode from 'vscode';

let validLanguages: Array<string> = [];

function getConfiguration(context: vscode.ExtensionContext) {
    const configuration = vscode.workspace.getConfiguration("tab-emacs");

    validLanguages = configuration.get<Array<string>>("validLanguages") || [];
    
    // Dispose current settings.
    for (const element of context.subscriptions) {
        element.dispose();
    }
    return validLanguages;
}

export function activate(context: vscode.ExtensionContext) {
    getConfiguration(context);
    const disposable = vscode.commands.registerTextEditorCommand('tab-emacs.reindentLines', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No editor');
            return;
        }
        if ((editor.document.languageId === 'plaintext')
            || (validLanguages
                && (validLanguages.length > 0)
                && (validLanguages.indexOf(editor.document.languageId) === -1))) {
            vscode.commands.executeCommand('editor.action.indentLines');
        } else {
            reindentCurrentLine(editor);
        }
    });
    context.subscriptions.push(disposable);
}

export function deactivate(): undefined {
    console.log("Deactivated extension");
    return undefined;
}

function getCurrentLine(editor: vscode.TextEditor): string {
    const position = editor.selection.active;
    const range = new vscode.Range(position.with(position.line, 0), position.with(position.line + 1, 0));
    return editor.document.getText(range);
}

function reindentCurrentLine(editor: vscode.TextEditor) {
    let position = editor.selection.active;
    let currentLine = getCurrentLine(editor);

    if (position.line > 0 && editor.document.lineAt(position.line - 1).isEmptyOrWhitespace) {
        let s = position.line - 1;
        while (editor.document.lineAt(s).isEmptyOrWhitespace) {
            --s;
        }
        editor.selection = new vscode.Selection(position.with(s, 0), position.with(position.line + 1, 0));
    }
    vscode.commands.executeCommand('editor.action.reindentselectedlines').then(val => {
        editor.selection = new vscode.Selection(position, position);
        let offset = currentLine.length - position.character; // position from right
        if (offset < currentLine.trimLeft().length) {
            currentLine = getCurrentLine(editor);
            position = position.with(position.line, currentLine.length - offset);
        } else {
            currentLine = getCurrentLine(editor);
            offset = currentLine.length - currentLine.trim().length; // indent size
            position = position.with(position.line, offset - 1);
        }
        editor.selection = new vscode.Selection(position, position);
    });
}
