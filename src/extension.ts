// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // console.log('Congratulations, your extension "reactjs-vscode-helper" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('reactjs-vscode-helper.import_convert_to_lazy', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user

        const editor = vscode.window.activeTextEditor;
        const selection = editor?.selection;
        if (!editor || !selection) {
            return;
        }

        const currentLineRange = editor.document.lineAt(selection.active.line);

        const line = currentLineRange.text.trim();

        const isNamedExport = line.includes('{') && line.includes('}');
        const isDefaultExport = !isNamedExport;
        const hasSemiColon = line.includes(';');
        const isSingleQuote = line.includes("'");
        const qoute = isSingleQuote ? "'" : '"';
        const qouteRegex = isSingleQuote ? new RegExp(/\'(.*?)\'/) : new RegExp(/\"(.*?)\"/);

        if (isDefaultExport) {
            const imports = line.split(' ').at(1);

            const path = line.match(qouteRegex)?.at(1)?.trim();

            const replacement = `const ${imports} = React.lazy(() => import(${qoute}${path}${qoute}))${hasSemiColon ? ';' : ''}`;

            editor.edit((edit) => edit.replace(currentLineRange.range, replacement));
            return;
        }

        if (isNamedExport) {
            console.log('Named export');
            // React only supports default exports
            // https://legacy.reactjs.org/docs/code-splitting.html#named-exports
            vscode.window.showInformationMessage(
                'Named exports is not supported by react.\nhttps://legacy.reactjs.org/docs/code-splitting.html#named-exports',
            );
            return;

            // let imports = /\{(.*?)\}/.exec(line)?.at(1);
            // if (!imports) {
            //     return;
            // }

            // const isMultiImports = imports.includes(',');

            // if (isMultiImports) {
            //     const splitImports = imports.split(',');
            //     console.log(splitImports);
            //     vscode.window.showInformationMessage('Multi imports not yet supported!');
            //     return;
            // }

            // imports = imports.trim();

            // const path = line.match(qouteRegex)?.at(1)?.trim();

            // const replacement = `const ${imports} = React.lazy(() => import(${qoute}${path}${qoute}).then((module) => ({ default: module.${imports} })))${hasSemiColon ? ';' : ''}`;

            // editor.edit((edit) => edit.replace(currentLineRange.range, replacement));
            // return;
        }

        // vscode.window.showInformationMessage('Hello World from reactjs-vscode-helper!');
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
