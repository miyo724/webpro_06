"use strict";

// expressモジュールをインポートしてアプリを初期化
const express = require("express");
const app = express();

// タスクを格納する配列
let tasks = [];

// 静的ファイル（HTML、CSS、JS）の提供
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  // JSONデータのパース

// EJSを使用してビューをレンダリングする設定
app.set('view engine', 'ejs');

// タスクの追加処理
app.post("/add-task", (req, res) => {
    const task = req.body.task;  // クライアントから送信されたタスク
    if (task) {
        tasks.push(task);  // タスクを配列に追加
        res.json({ task: task, tasks: tasks });  // 新しく追加されたタスクと現在のタスク一覧を返す
    } else {
        res.status(400).json({ error: "タスクが入力されていません" });  // タスクが空の場合はエラーレスポンス
    }
});

// タスクの削除処理
app.delete("/delete-task", (req, res) => {
    const taskToDelete = req.body.task;  // クライアントから送信された削除するタスク
    tasks = tasks.filter(task => task !== taskToDelete);  // 指定したタスクを削除
    res.json({ tasks: tasks });  // 更新されたタスク一覧を返す
});

// タスクの取得処理（POSTメソッドに変更）
app.post("/tasks", (req, res) => {
    res.json({ tasks: tasks });  // 現在のタスク一覧を返す
});

// BBS（掲示板）関連の処理
let bbs = [];  // 本来はDBMSを使用するが、今回はこの変数にデータを蓄える

// ここでのapp.get()をapp.post()に変更
app.post("/hello1", (req, res) => {
    const message1 = "Hello world";
    const message2 = "Bon jour";
    res.render('show', { greet1: message1, greet2: message2 });
});

app.post("/hello2", (req, res) => {
    res.render('show', { greet1: "Hello world", greet2: "Bon jour" });
});

app.post("/icon", (req, res) => {
    res.render('icon', { filename: "./public/Apple_logo_black.svg", alt: "Apple Logo" });
});

app.post("/luck", (req, res) => {
    const num = Math.floor(Math.random() * 6 + 1);
    let luck = '';
    if (num == 1) luck = '大吉';
    else if (num == 2) luck = '中吉';
    console.log('あなたの運勢は' + luck + 'です');
    res.render('luck', { number: num, luck: luck });
});

app.post("/janken", (req, res) => {
    let hand = req.body.hand;
    let win = Number(req.body.win);
    let total = Number(req.body.total);
    console.log({ hand, win, total });
    const num = Math.floor(Math.random() * 3 + 1);
    let cpu = '';
    if (num == 1) cpu = 'グー';
    else if (num == 2) cpu = 'チョキ';
    else cpu = 'パー';
    let judgement = '勝ち';
    win += 1;
    total += 1;
    const display = {
        your: hand,
        cpu: cpu,
        judgement: judgement,
        win: win,
        total: total
    };
    res.render('janken', display);
});

// APIのテスト（GET → POSTに変更）
app.post("/get_test", (req, res) => {
    res.json({
        answer: 0
    });
});

// 数値を足す処理（GET → POSTに変更）
app.post("/add", (req, res) => {
    console.log("POST");
    console.log(req.body);
    const num1 = Number(req.body.num1);
    const num2 = Number(req.body.num2);
    console.log(num1);
    console.log(num2);
    res.json({ answer: num1 + num2 });
});

// BBSの操作（メッセージの投稿と取得）
app.post("/check", (req, res) => {
    res.json({ number: bbs.length });
});

app.post("/read", (req, res) => {
    const start = Number(req.body.start);
    console.log("read -> " + start);
    if (start == 0) res.json({ messages: bbs });
    else res.json({ messages: bbs.slice(start) });
});

app.post("/post", (req, res) => {
    const name = req.body.name;
    const message = req.body.message;
    console.log([name, message]);
    bbs.push({ name: name, message: message });
    res.json({ number: bbs.length });
});

// サーバーを指定のポートで起動
app.listen(8080, () => console.log("Example app listening on port 8080!"));
