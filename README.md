# vscode-emacs-indent-v2 README

This is a failed experiment.  Other plugins use reindentLine which doesn't handle all
cases because it doesn't know much about language format.  formatDocument does know a
a lot and using it to indent a single line correctly works great, SO LONG AS the style
you are using matches your language identation settings.  BUT, if you use default C lang
settings in a cpp file, for example, and the file is K&R, it will gleefully reformat
the file into Visual Studio / Allman.  It is too dangerous.

This plugin provides tab keybinding, which indents like emacs behavior.  Specifically,
- If a region is selected, reindent the region.
- If point is in leading indentation, (re)indent the line and move to indentation
- If point is anywhere else, reindent the line and stay put

The extension overrides the default binding of tab in textEditorFocus context.

When editor.tabCompletion is enabled, this extension was prevent inline suggestion acceptance.
So I changed the extension to only run in certain contexts (when autosuggestion is not active).

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