import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "random-quotes" is now active!');

	function getQuotes(): string[] {
		const config = vscode.workspace.getConfiguration('randomQuotes');
		return config.get('quotes', []);
	}

	let disposable = vscode.commands.registerCommand('extension.quotelorem', () => {
		const quotes = getQuotes();
		if (quotes.length === 0) {
			vscode.window.showErrorMessage('No quotes defined in settings');
			return;
		}
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const quote = quotes[Math.floor(Math.random() * quotes.length)];
			editor.insertSnippet(new vscode.SnippetString(quote));
		}
	});

    context.subscriptions.push(disposable);
}

export function deactivate() {}