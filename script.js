// Targetto gli elementi del DOM e li salvo in costanti
const input = document.getElementById("todo-input");
const addButton = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

// Array per memorizzare lo stato dei task
let tasks = [];

// Carica i task salvati all'avvio della pagina
function loadTasks() {
  const saved = localStorage.getItem("todos");
  if (saved) {
    tasks = JSON.parse(saved);
  }
  renderTasks();
}

// Salva l'array di task attuale nel localStorage
function saveTasks() {
  localStorage.setItem("todos", JSON.stringify(tasks));
}

// Funzione che disegna i task nella pagina a partire dall'array 'tasks'
function renderTasks() {
  todoList.innerHTML = ""; // Pulisce la lista prima di ridisegnarla

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-container";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;

    const span = document.createElement("span");
    span.innerText = task.text;
    if (task.completed) {
      span.classList.add("completed");
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    deleteBtn.className = "delete-btn";

    // LOGICA EVENTI
    checkbox.onchange = function () {
      task.completed = checkbox.checked;
      span.classList.toggle("completed", task.completed);
      saveTasks();
    };

    span.onclick = function () {
      task.completed = !task.completed;
      checkbox.checked = task.completed;
      span.classList.toggle("completed", task.completed);
      saveTasks();
    };

    deleteBtn.onclick = function () {
      tasks = tasks.filter((t) => t.id !== task.id); // Rimuove il task dall'array
      saveTasks();
      renderTasks(); // Ridisegna la lista
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}

// Definisco quello che succede quando aggiungiamo un task
function addTask() {
  const taskText = input.value.trim();

  // Controllo di sicurezza, se l'input è vuoto non fare nulla
  if (taskText === "") {
    alert("Prima aggiungi qualcosa");
    return;
  }

  // Creo il nuovo oggetto task con id unico
  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  tasks.push(newTask);
  saveTasks();
  renderTasks();

  // Puliamo l'input per il prossimo task
  input.value = "";
}

// Ascoltiamo il click sul bottone
addButton.addEventListener("click", addTask);

// Permette di premere "INVIO" dalla tastiera
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

// Carichiamo i task salvati non appena la pagina è pronta
document.addEventListener("DOMContentLoaded", loadTasks);
