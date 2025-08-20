// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// Global variables to store language configuration disposable and document state
let languageConfigDisposable: vscode.Disposable | undefined;
const originalLanguages = new Map<string, string>();
let isExtensionEnabled = true;
let documentListeners: vscode.Disposable[] = [];

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('SongTxt extension is now active.');

    // Check current state from storage
    isExtensionEnabled = context.globalState.get('songtxt.enabled', true);

    // create state notification manager
    const stateNotification = new StateNotification();

    // Set up document event listeners
    setupDocumentEventListeners(context);

    // Apply current state on activation
    if (isExtensionEnabled) {
        enableSongTxtFeatures(context, stateNotification);
    } else {
        disableSongTxtFeatures(context, stateNotification);
    }

    const enableCommand = vscode.commands.registerCommand('extension.enableSongtxt', async () => {
        isExtensionEnabled = true;
        await enableSongTxtFeatures(context, stateNotification);
        await context.globalState.update('songtxt.enabled', true);
    });
    
    const disableCommand = vscode.commands.registerCommand('extension.disableSongtxt', async () => {
        isExtensionEnabled = false;
        await disableSongTxtFeatures(context, stateNotification);
        await context.globalState.update('songtxt.enabled', false);
    });
    
    // Add to a list of disposables which are disposed when this extension is deactivated.
    context.subscriptions.push(stateNotification);
    context.subscriptions.push(enableCommand);
    context.subscriptions.push(disableCommand);
}

async function enableSongTxtFeatures(context: vscode.ExtensionContext, stateNotification: StateNotification) {
    try {
        // Enable file associations for new files
        await enableLanguageAssociations();
        
        // Enable language configuration
        enableLanguageConfiguration();
        
        // Store disposable for cleanup
        if (languageConfigDisposable) {
            context.subscriptions.push(languageConfigDisposable);
        }
        
        // Re-enable syntax highlighting for currently open documents
        await enableSyntaxForOpenDocuments();
        
        // Update UI
        stateNotification.updateState(true);
        
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to enable SongTxt: ${error}`);
    }
}

async function disableSongTxtFeatures(context: vscode.ExtensionContext, stateNotification: StateNotification) {
    try {
        // Disable file associations for new files
        await disableLanguageAssociations();
        
        // Disable language configuration
        disableLanguageConfiguration();
        
        // Disable syntax highlighting for currently open documents
        await disableSyntaxForOpenDocuments();
        
        // Update UI
        stateNotification.updateState(false);
        
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to disable SongTxt: ${error}`);
    }
}

async function enableLanguageAssociations(): Promise<void> {
    const fileConfiguration = vscode.workspace.getConfiguration('files');
    const currentAssociations = fileConfiguration.get('associations') as Record<string, string> || {};
    
    // Create a new object to avoid proxy issues
    const newAssociations = { ...currentAssociations };
    newAssociations['*.txt'] = 'songtxt';
    newAssociations['*.tab'] = 'songtxt';
    
    await fileConfiguration.update('associations', newAssociations, vscode.ConfigurationTarget.Global);
}

async function disableLanguageAssociations(): Promise<void> {
    const fileConfiguration = vscode.workspace.getConfiguration('files');
    const currentAssociations = fileConfiguration.get('associations') as Record<string, string> || {};
    
    // Create a new object to avoid proxy issues
    const newAssociations = { ...currentAssociations };
    
    // Only remove if they're set to songtxt to avoid overriding user's custom settings
    if (newAssociations['*.txt'] === 'songtxt') {
        delete newAssociations['*.txt'];
    }
    if (newAssociations['*.tab'] === 'songtxt') {
        delete newAssociations['*.tab'];
    }
    
    await fileConfiguration.update('associations', newAssociations, vscode.ConfigurationTarget.Global);
}

function enableLanguageConfiguration(): void {
    const languageConfig: vscode.LanguageConfiguration = {
        brackets: [
            ['{', '}'],
            ['[', ']'],
            ['(', ')'],
            ['<', '>']
        ],
        autoClosingPairs: [
            { open: '{', close: '}' },
            { open: '[', close: ']' },
            { open: '(', close: ')' }
        ]
    };
    
    languageConfigDisposable = vscode.languages.setLanguageConfiguration('songtxt', languageConfig);
}

function disableLanguageConfiguration(): void {
    if (languageConfigDisposable) {
        languageConfigDisposable.dispose();
        languageConfigDisposable = undefined;
    }
}

async function disableSyntaxForOpenDocuments(): Promise<void> {
    const documents = vscode.workspace.textDocuments;
    
    for (const doc of documents) {
        if (doc.languageId === 'songtxt') {
            // Store original language for restoration
            originalLanguages.set(doc.uri.toString(), doc.languageId);
            
            // Switch to plaintext to remove syntax highlighting
            await vscode.languages.setTextDocumentLanguage(doc, 'plaintext');
        }
    }
}

async function enableSyntaxForOpenDocuments(): Promise<void> {
    const documents = vscode.workspace.textDocuments;
    
    for (const doc of documents) {
        const originalLang = originalLanguages.get(doc.uri.toString());
        
        if (originalLang === 'songtxt' && doc.languageId === 'plaintext') {
            // Restore original language
            await vscode.languages.setTextDocumentLanguage(doc, 'songtxt');
        }
        
        // Also check for files that should be songtxt based on extension
        if (!originalLang && 
            (doc.fileName.endsWith('.txt') || doc.fileName.endsWith('.tab')) &&
            doc.languageId === 'plaintext') {
            // These files should be songtxt when enabled
            await vscode.languages.setTextDocumentLanguage(doc, 'songtxt');
        }
    }
    
    // Clear the original languages map after restoration
    originalLanguages.clear();
}

function setupDocumentEventListeners(context: vscode.ExtensionContext): void {
    // Clear any existing listeners
    documentListeners.forEach(listener => listener.dispose());
    documentListeners = [];

    // Listen for when documents are opened
    const onDidOpenListener = vscode.workspace.onDidOpenTextDocument(async (document) => {
        await handleDocumentStateChange(document);
    });

    // Listen for when the active editor changes (tab switching)
    const onDidChangeActiveEditorListener = vscode.window.onDidChangeActiveTextEditor(async (editor) => {
        if (editor?.document) {
            await handleDocumentStateChange(editor.document);
        }
    });

    // Listen for when visible editors change
    const onDidChangeVisibleEditorsListener = vscode.window.onDidChangeVisibleTextEditors(async (editors) => {
        for (const editor of editors) {
            if (editor.document) {
                await handleDocumentStateChange(editor.document);
            }
        }
    });

    documentListeners = [onDidOpenListener, onDidChangeActiveEditorListener, onDidChangeVisibleEditorsListener];
    
    // Add listeners to context for cleanup
    context.subscriptions.push(...documentListeners);
}

async function handleDocumentStateChange(document: vscode.TextDocument): Promise<void> {
    // Only handle txt and tab files
    if (!document.fileName.endsWith('.txt') && !document.fileName.endsWith('.tab')) {
        return;
    }

    if (!isExtensionEnabled) {
        // Extension is disabled - ensure document is in plaintext mode
        if (document.languageId === 'songtxt') {
            await vscode.languages.setTextDocumentLanguage(document, 'plaintext');
        }
    } else {
        // Extension is enabled - ensure document is in songtxt mode
        if (document.languageId === 'plaintext') {
            await vscode.languages.setTextDocumentLanguage(document, 'songtxt');
        }
    }
}

// this method is called when your extension is deactivated
export function deactivate() {
    // Clean up listeners
    documentListeners.forEach(listener => listener.dispose());
    documentListeners = [];
}

class StateNotification {
    
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
        // Show notification
        vscode.window.showInformationMessage('SongTxt mode is now enabled');
        
        // Update the status bar
        this._statusBarItem.text = '$(music) SongTxt: Enabled';
        this._statusBarItem.tooltip = 'SongTxt syntax highlighting is active. Click to disable.';
        this._statusBarItem.command = 'extension.disableSongtxt';
        this._statusBarItem.show();
    }

    public disabled() {
        // Show notification
        vscode.window.showInformationMessage('SongTxt mode is now disabled');
        
        // Update the status bar
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