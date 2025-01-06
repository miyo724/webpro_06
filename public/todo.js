"use strict";

// DOM要素を取得
const taskInput = document.querySelector("#task");
const tagsInput = document.querySelector("#tags");
const dueDateInput = document.querySelector("#due-date");
const addTaskButton = document.querySelector("#add-task");
const taskList = document.querySelector("#task-list");
const tagFilters = document.querySelector("#tag-filters");

// タスクデータを格納する配列（タスク、完了状態、タグ、締め切り日）
let tasks = [];

// タグフィルタの表示
function renderTagFilters() {
    const allTags = tasks.flatMap(task => task.tags);
    const uniqueTags = [...new Set(allTags)];

    tagFilters.innerHTML = ""; // 既存のフィルタをクリア

    uniqueTags.forEach(tag => {
        const tagButton = document.createElement("button");
        tagButton.textContent = tag;
        tagButton.addEventListener("click", () => filterTasksByTag(tag));
        tagFilters.appendChild(tagButton);
    });
}

// タグでフィルタリング
function filterTasksByTag(tag) {
    const filteredTasks = tasks.filter(task => task.tags.includes(tag));
    renderTasks(filteredTasks);
}

// タスク追加処理
addTaskButton.addEventListener("click", () => {
    const task = taskInput.value.trim();
    const tags = tagsInput.value.trim().split(',').map(tag => tag.trim()).filter(tag => tag);
    const dueDate = dueDateInput.value;  // 締め切り日を取得

    if (!task) {
        alert("タスクを入力してください");
        return;
    }

    // 締め切り日が指定されていない場合はnullにする
    const taskData = {
        task: task,
        isCompleted: false,
        tags: tags,
        dueDate: dueDate ? new Date(dueDate) : null
    };

    // 新しいタスクをtasks配列に追加
    tasks.push(taskData);

    // タスクを表示
    renderTasks();

    // タスク入力フィールドをクリア
    taskInput.value = "";
    tagsInput.value = "";  // タグ入力フィールドをクリア
    dueDateInput.value = "";  // 締め切り日入力フィールドをクリア
});

// タスクの完了状態を変更する関数
function toggleTaskCompletion(index) {
    tasks[index].isCompleted = !tasks[index].isCompleted;  // 完了状態を切り替える
    renderTasks();
}

// タスクをリストに追加する関数
function renderTasks(filteredTasks = tasks) {
    taskList.innerHTML = ""; // まずタスクリストをクリア

    const incompleteTasks = filteredTasks.filter(task => !task.isCompleted);
    const completedTasks = filteredTasks.filter(task => task.isCompleted);

    // 未完了タスクをリストに追加
    incompleteTasks.forEach((taskObj, index) => {
        const listItem = document.createElement("li");

        // タスクテキスト
        const taskText = document.createElement("span");
        taskText.textContent = taskObj.task;

        // 完了チェックボックス
        const completeCheckbox = document.createElement("input");
        completeCheckbox.type = "checkbox";
        completeCheckbox.addEventListener("change", () => toggleTaskCompletion(index));

        listItem.appendChild(completeCheckbox);
        listItem.appendChild(taskText);

        // 締め切り日表示
        if (taskObj.dueDate) {
            const dueDateText = document.createElement("span");
            dueDateText.textContent = ` - 締め切り: ${taskObj.dueDate.toLocaleDateString()}`;
            if (taskObj.dueDate < new Date()) {
                dueDateText.style.color = "red";  // 過ぎた期限は赤く表示
            }
            listItem.appendChild(dueDateText);
        }

        // タグ表示
        const tagList = document.createElement("span");
        tagList.textContent = " タグ: " + taskObj.tags.join(", ");
        listItem.appendChild(tagList);

        taskList.appendChild(listItem);
    });

    // 完了したタスクをリストに追加（未完了タスクの後）
    completedTasks.forEach((taskObj, index) => {
        const listItem = document.createElement("li");

        // タスクテキスト（完了タスクには取り消し線を引く）
        const taskText = document.createElement("span");
        taskText.textContent = taskObj.task;
        taskText.style.textDecoration = "line-through";  // 完了したタスクに取り消し線を引く

        // 完了チェックボックス（既にチェックされている）
        const completeCheckbox = document.createElement("input");
        completeCheckbox.type = "checkbox";
        completeCheckbox.checked = true;
        completeCheckbox.addEventListener("change", () => toggleTaskCompletion(index));

        listItem.appendChild(completeCheckbox);
        listItem.appendChild(taskText);

        // 締め切り日表示
        if (taskObj.dueDate) {
            const dueDateText = document.createElement("span");
            dueDateText.textContent = ` - 締め切り: ${taskObj.dueDate.toLocaleDateString()}`;
            if (taskObj.dueDate < new Date()) {
                dueDateText.style.color = "red";  // 過ぎた期限は赤く表示
            }
            listItem.appendChild(dueDateText);
        }

        // タグ表示
        const tagList = document.createElement("span");
        tagList.textContent = " タグ: " + taskObj.tags.join(", ");
        listItem.appendChild(tagList);

        taskList.appendChild(listItem);
    });

    // タグフィルタの更新
    renderTagFilters();
}

// ページが読み込まれた時にタスクを表示
window.addEventListener("DOMContentLoaded", renderTasks);
