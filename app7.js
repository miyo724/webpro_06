"use strict";

const express = require("express");
const app = express();

let tasks = [];  // タスクを格納する配列

// EJSを使用してビューをレンダリングする設定
app.set('view engine', 'ejs');

// 静的ファイル（HTML、CSS、JS）の提供
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  // JSONデータのパース

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

// タスクの取得処理（GETからPOSTに変更）
app.post("/tasks", (req, res) => {
    res.json({ tasks: tasks });  // 現在のタスク一覧を返す
});

// サーバーを指定のポートで起動
app.listen(8080, () => console.log("Example app listening on port 8080!"));
