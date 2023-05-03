# tab-emacs README

This plugin provides tab keybinding, which indents like emacs behavior.  Specifically,
- If point is in leading indentation, (re)indent the line and move to indentation
- If point is anywhere else, reindent the line and stay put
- If a region is selected, reindent the region.

The extension seems reliable in javascript/typescript/json.  Not so reliable in C/C++ mode
depending on the myriad of control settings. Python can be problematic in many cases as well.
I doubt it would work reliably in a language like php either. But the behavior degrades to
what the built in indentLines for languages it does not understand.

The extension overrides the default binding of tab in textEditorFocus context.

When editor.tabCompletion is enabled, this extension was preventing inline suggestion acceptance.
So I changed the extension to only run in certain contexts (when autosuggestion is not active). So
it will not reindent if a completion/suggestion is offered.  In that case, tab will accept the
iniline suggestion.

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

it reindents the line and if the cursor is in the indentation, moves to the first position
after identation.

### 0.0.13

Rename package tab-emacs. Abandon Format Document and use patched modified original approach
from later branch by original author (look back to find a non-blank reference line and let
reindentLines do the heavy lifting). Add configuration for languages where this extension
should apply. You can configure this in settings.json thus:

   "tab-emacs.Languages": [
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact",
        "json",
        "jsonc"
    ]

Unset or empty array means use in all languages (except plaintext).
