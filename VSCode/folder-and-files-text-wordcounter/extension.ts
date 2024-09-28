import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {

	const disposable = vscode.commands.registerCommand(
		'folder-word-counter.sumcount',
		async (uri: vscode.Uri, uriArray: vscode.Uri[]) => {
			let totalWordCount = 0;

		// デバッグメッセージ：選択内容の取得の確認
		//vscode.window.showInformationMessage(`uri: ${uri ? uri.fsPath : 'undefined'}`);
		//vscode.window.showInformationMessage(`uriArray: ${uriArray ? uriArray.length : 'undefined'}`);

			//エクスプローラーで複数ファイルを選択した場合
			if (uriArray && uriArray.length > 0 && fs.statSync(uriArray[0].fsPath).isFile()) {
				//vscode.window.showInformationMessage("複数ファイル");	//デバッグメッセージ：分岐の確認
				for (const uri of uriArray) {
					const filePath = uri.fsPath;
					const stat = fs.statSync(filePath);

					if (stat.isFile() && path.extname(filePath) === '.txt') {
						const content = fs.readFileSync(filePath, 'utf-8');
						//改行コードと空白（全角と半角）を合計から除外
						const cleanedContent = content.replace(/[\r\n\s\u3000]/g, ''); 
						totalWordCount += cleanedContent.length;
					}
				}
			//フォルダを選択したときの処理
			} else if (uri && uri.fsPath && fs.statSync(uri.fsPath).isDirectory()) {
				//vscode.window.showInformationMessage("フォルダ");	//デバッグメッセージ：分岐の確認
				const folderPath = uri.fsPath;
				const files = fs.readdirSync(folderPath);
				for (const file of files) {
					const filePath = path.join(folderPath, file);
					const stat = fs.statSync(filePath);

					if (stat.isFile() && path.extname(filePath) === '.txt') {
						const content = fs.readFileSync(filePath, 'utf-8');
						//改行コードと空白（全角と半角）を合計から除外
						const cleanedContent = content.replace(/[\r\n\s\u3000]/g, ''); 
						totalWordCount += cleanedContent.length;
					}
				}
			}
			vscode.window.showInformationMessage(`Total number of characters : ${totalWordCount}`);
		}
	);

	context.subscriptions.push(disposable);
}

//拡張機能の非アクティブ化メソッド
export function deactivate() {}
