# vscode-emacs-indent-v2 README

This plugin provides tab keybinding, which indents like emacs behavior.  Specifically,
- If a region is selected, reindent the region.
- If point is in leading indentation, (re)indent the line and move to indentation
- If point is anywhere else, reindent the line and stay put

The extension overrides the default binding of tab in textEditorFocus context.

When editor.tabCompletion is enabled, this extension will prevent inline suggestion acceptance 
unless you add the following items to your keyboard shortcuts:

{
    "key": "tab",
    "command": "emacs-indent.reindentCurrentLine-v2",
    "when": "editorTabMovesFocus && editorTextFocus || editorTextFocus && !inlineSuggestionHasIndentationLessThanTabSize || editorTextFocus && !inlineSuggestionVisible"
},
{
    "key": "tab",
    "command": "-emacs-indent.reindentCurrentLine-v2",
    "when": "editorTextFocus"
},

I have changed the code to implement the above by default, so if its not working check the keybinding when expressions.

Sometimes, you just want a real tab and this command won't do that. For these situations, use Ctrl+i

## Release Notes

### 0.0.1

Initial release of vscode-emacs-indent

### 0.0.9

Use formatDocument editor action for generalized behavior that works in
more languages.

### 0.0.11

Proper case command name. Add documentation. Change when expression for keybinding
so that it does not interfere with inline suggestion completion.