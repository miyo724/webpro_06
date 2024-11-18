# webpro_06　
## ファイル一覧
ファイル名 | 説明
-|-
app5.js | 全体のプログラム本体
icon.ejs　| 画像を読み取りその結果の画像を貼り付ける．
janken.els　| 自分の手とコンピューターの手が出力され，その結果と勝ち数も出力される．
luck.ejs | ランダムな数をおみくじの結果として出力する．
show.ejs　| 挨拶1と挨拶2の２つを出力させる．
janken.html　| じゃんけんの入力欄を担い，結果を実行する．
test.html　| 拡張子```hmtl```の使用を理解するための一例
## 起動方法
1. ```node apple5.js```でプログラムを起動する．
2. Webブラウザで```localhost:8080/XXX```にアクセスする．
ただしこのXXXは各プログラムの```app.get("/XXX"，```の部分はその使いたいものによって変動するので気をつける必要がある．

## 今回の課題についての説明書　
今回作成したのは
1. ```app5.js```
2. ```attimuite.ejs```
3. ```count.els```
の合計3つである．この3つのうち2つは拡張子が```.ejs```であり，それぞれあっちむいてホイと文字数をカウントしてくれるサイトを作成したものである．各ファイルの簡易的な説明は下の表通りになる．
## ファイル一覧
ファイル名 | 説明
-|-
app5.js | あっちむいてホイと文字数カウントと文字数を2倍にするプログラム本体
attimuite.ejs　| あっちむいてホイの開始画面
count.els　| 文字数のカウントの開始画面かつその文字数の2倍の開始画面

ここで各ファイルについて詳しく説明していく．
## ```app5.js```について(あっちむいてホイ)
1. ```node apple5.js```でプログラムを起動する．
2. Webブラウザで```localhost:8080/attimuite```にアクセスする．
3.  以下のコードよりコンピューターの手がランダムで決まる．
```javascript 
const cpuDirection = validDirections[Math.floor(Math.random() * validDirections.length)];
```
4. コンピューターの手により勝敗が決まる．
5. 次の関数よりデータをテンプレートに渡す準備をする．
```javascript 
const display．
```
6. 最後に，次の関数より```attimuite.ejs```に渡される．
```javascript 
res.render('attimuite', display);
```
## ```app5.js```について(文字数カウント)
1. ```node apple5.js```でプログラムを起動する．
2. Webブラウザで```localhost:8080/count```にアクセスする．
3. 次の関数から，入力された文字数をカウントする．
 ```javascript
 const charCount = inputText.length;
  ```
4. 次の関数よりデータをテンプレートに渡す準備をする．
```javascript 
const display．
```
5. 
最後に，次の関数より```count.ejs```に渡される．
```javascript 
res.render('count', display);
```
## ```attimuite.ejs```について
1. ```app5.js```をもとにあっちむいてホイができるように文字を表示させる．
2. 次の関数から注目されるように，選択する「右」，「左」，「上」，「下」は赤字で表示される．
 ```javascript 
 <p style="color: red;"><%= errorMessage %></p>
 ```
3. 自分の選択肢，コンピューターの手，結果，何回戦目なのか，何回勝ったのかが表示される．
## ```count.ejs```について
1. ```app5.js```をもとに入力された文字数をカウントする．
2. 文字数を2倍にする．
 
## 使用するための手順
## あっちむいてホイ
1. ```node apple5.js```でプログラムを起動する．
2. Webブラウザで```localhost:8080/attimuite```にアクセスする．
3. 自分の向きたい方向を「右」，「左」，「上」，「下」のうちどれか1つを選択する．
4. コンピューターの手により勝敗が分かる．
## 文字数カウント
1. ```node apple5.js```でプログラムを起動する．
2. Webブラウザで```localhost:8080/count```にアクセスする．
3. 自分の調べたい文字数を好きなだけ入力する．
4. その文字数が表示される．
5. また，その文字数の2倍も表示される．


<!-- ```mermaid -->
<!-- flowchart TD;
開始 -->　
<!--　
終了;
```

```mermaid
flowchart TD;

start["開始"];
end1["終了"]
if{"条件に合うか"}
win["勝ち"]
loose["負け"]

start --> 
<!--if
if -->
<!--|yes| win
win -->
<!-- end1
if -->
<!--|no| loose
loose --> 
<!--end1




