const vscode = require('vscode')
let lastActionWasFold = false

function activate(context) {
  console.log('Congratulations, your extension "foldtogglr" is now active!')
  let disposable = vscode.commands.registerCommand('foldtogglr.checkAndToggleFold', async () => {
    const editor = vscode.window.activeTextEditor
    if (!editor) {
      vscode.window.showInformationMessage('No editor is active')
      return
    }

    const config = vscode.workspace.getConfiguration('foldtogglr')
    const foldLevel = config.get('foldLevel', 2)

    if (lastActionWasFold) {
      // If the last action was to fold, then unfold all.
      await vscode.commands.executeCommand('editor.unfoldAll')
      vscode.window.showInformationMessage('Unfolded all sections.')
      lastActionWasFold = false // Update the state to reflect the last action.
    } else {
      // Try folding to a specific level (for simplicity, using level 2).
      await vscode.commands.executeCommand('editor.foldLevel' + foldLevel.toString())
      console.log('folding to level: ' + foldLevel)
      vscode.window.showInformationMessage('Folded to level' + foldLevel)
      lastActionWasFold = true // Update the state to reflect the last action.
    }
  })

  context.subscriptions.push(disposable)
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
}
