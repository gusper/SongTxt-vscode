// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('SongTxt extension is now active.');

    // create a new word counter
    let stateNotification = new StateNotification();

    let enableCommand = vscode.commands.registerCommand('extension.enableSongtxt', () => {
        stateNotification.enabled();
    });
    let disableCommand = vscode.commands.registerCommand('extension.disableSongtxt', () => {
        stateNotification.disabled();
    });
    
    // Add to a list of disposables which are disposed when this extension is deactivated.
    context.subscriptions.push(stateNotification);
    context.subscriptions.push(enableCommand);
    context.subscriptions.push(disableCommand);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

class StateNotification {
    
    private _statusBarItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    
    public enabled() {
        // Show notification
        vscode.window.showInformationMessage('SongTxt mode is now enabled');
        
        // Update the status bar
        this._statusBarItem.text = 'SongTxt';
        this._statusBarItem.show();
    }

    public disabled() {
        // Show notification
        vscode.window.showInformationMessage('SongTxt mode is now disabled');
        
        // Update the status bar
        this._statusBarItem.hide();
    }

    dispose() {
        this._statusBarItem.dispose();
    }
}