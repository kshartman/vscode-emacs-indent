'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerTextEditorCommand('emacs-indent.reindentCurrentLine-v2', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showInformationMessage('No editor');
            return;
        }
        if (editor.document.languageId === 'plaintext') {
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

// function getLineCount(editor: vscode.TextEditor): number {
//     const range = editor.selection;
//     const beg = range.start.line;
//     const end = range.end.line;
//     if (end < beg) {
//         return beg - end + 1;
//     }
//     return end - beg + 1;
//}

function reindentCurrentLine(editor: vscode.TextEditor) {
    let position = editor.selection.active;
    let currentLine = getCurrentLine(editor);
    // const numLines = getLineCount(editor);
    // if (numLines === 1) {
    //     editor.selection = new vscode.Selection(position.with(position.line, 0), position.with(position.line, 0));        
    // }
    //
    // reindentselectedlines does not work in some documents
    //
    // formatDocument works in every case I tried (js, ts, json)
    // but its dangerous.  If you use it in a cpp file that is K&R and you
    // have the default settings for clang-format it will reformat the code
    // to Allman style (not just the current line). So long as you have the 
    // correct settings in your indentation settings and the file you are
    // editing matches that style, then this approach works.
    vscode.commands.executeCommand('editor.action.formatDocument').then(val => {
        editor.selection = new vscode.Selection(position, position);
        let offset = currentLine.length - position.character; // position from right
        if (offset < currentLine.trimLeft().length) {
            currentLine = getCurrentLine(editor);
            position = position.with(position.line, currentLine.length - offset);
        } else {
            currentLine = getCurrentLine(editor);
            offset = currentLine.length - currentLine.trim().length; // indent size
            if (offset > 1) {
                position = position.with(position.line, offset - 1);
                editor.selection = new vscode.Selection(position, position);
            }
            else {
                // an empty line
                vscode.commands.executeCommand('editor.action.indentLines');
            }
        }
    });
}
