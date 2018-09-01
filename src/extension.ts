'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { window, commands, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument } from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Songtxt extension is now active.');

    // create a new word counter
    let stateNotification = new StateNotification();

    let disposable = commands.registerCommand('extension.enableSongtxt', () => {
        stateNotification.enabled();
    });

    
    // Add to a list of disposables which are disposed when this extension is deactivated.
    context.subscriptions.push(stateNotification);
    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

class StateNotification {
    
    private _statusBarItem: StatusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
    
    public enabled() {
        // Show notification
        window.showInformationMessage('Songtxt mode is now enabled');
        
        // Update the status bar
        this._statusBarItem.text = 'Songtxt';
        this._statusBarItem.show();
    }

    dispose() {
        this._statusBarItem.dispose();
    }
}