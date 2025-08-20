import * as vscode from 'vscode';

export class StateNotification {
    
    private _statusBarItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    private _isEnabled: boolean = true;
    
    public updateState(enabled: boolean) {
        this._isEnabled = enabled;
        
        if (enabled) {
            this.enabled();
        } else {
            this.disabled();
        }
    }
    
    public enabled() {
        vscode.window.showInformationMessage('SongTxt mode is now enabled');
        
        this._statusBarItem.text = '$(music) SongTxt: Enabled';
        this._statusBarItem.tooltip = 'SongTxt syntax highlighting is active. Click to disable.';
        this._statusBarItem.command = 'extension.disableSongtxt';
        this._statusBarItem.show();
    }

    public disabled() {
        vscode.window.showInformationMessage('SongTxt mode is now disabled');
        
        this._statusBarItem.text = '$(circle-slash) SongTxt: Disabled';
        this._statusBarItem.tooltip = 'SongTxt syntax highlighting is disabled. Click to enable.';
        this._statusBarItem.command = 'extension.enableSongtxt';
        this._statusBarItem.show();
    }

    public get isEnabled(): boolean {
        return this._isEnabled;
    }

    dispose() {
        this._statusBarItem.dispose();
    }
}