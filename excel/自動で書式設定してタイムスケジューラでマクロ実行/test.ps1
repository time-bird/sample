# コメント
# 初期化
$excel = $null
# 起動したいエクセルファイルのフルパスを変数に格納
$file = "C:\フォルダ\ファイルのフルパス.xlsm"
# エクセルの起動
$excel = New-Object -ComObject Excel.application
# エクセルのウィンドウを表示、Falseなら非表示
$excel.Visible = $True
# アラートを非表示
$excel.DisplayAlerts = $false
# 指定ファイルのオープン
$book = $excel.workbooks.open($file)
# マクロの起動（引数が無い場合は名前だけ入れればOK・「"Module1.マクロ名"」と書いても良い）
$excel.run("マクロ名")
# ブックを保存して終了
$book.save
$book.close
# エクセルを終了・ブックの終了だけじゃなくこっちも絶対やる
$excel.Quit()
# 後処理
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($book)
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($excel)