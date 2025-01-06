
"use strict";

// DOM要素を取得
const taskInput = document.querySelector("#task");
const addTaskButton = document.querySelector("#add-task");
const taskList = document.querySelector("#task-list");

// タスク追加処理
addTaskButton.addEventListener("click", () => {
    const task = taskInput.value.trim();
    
    if (!task) {
        alert("タスクを入力してください");
        return;
    }

    // タスクをサーバーにPOST
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ task }) // タスク内容をJSONに変換
    };

    fetch("/add-task", params)
        .then((response) => {
            if (!response.ok) {
                throw new Error("タスクの追加に失敗しました");
            }
            return response.json();
        })
        .then((data) => {
            // 追加されたタスクをリストに表示
            addTaskToList(data.task);
            taskInput.value = ""; // 入力フィールドをクリア
        })
        .catch((error) => {
            console.error(error);
        });
});

// 既存のタスクをサーバーから取得して表示
function fetchTasks() {
    fetch("/tasks")
        .then((response) => response.json())
        .then((data) => {
            data.tasks.forEach((task) => {
                addTaskToList(task);
            });
        })
        .catch((error) => {
            console.error("タスクの取得に失敗しました", error);
        });
}

// タスクをリストに追加する関数
function addTaskToList(task) {
    const listItem = document.createElement("li");
    listItem.textContent = task;
    taskList.appendChild(listItem);
}

// ページが読み込まれた時に既存のタスクを表示
window.addEventListener("DOMContentLoaded", () => {
    fetchTasks();
});
