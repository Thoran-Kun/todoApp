//Targetto gli elementi del DOM e li salvo in costanti
const input = document.getElementById("todo-input")
const addButton = document.getElementById("add-btn")
const todoList = document.getElementById("todo-list")

//Ora definiso quello che succede quando aggiungiamo un task
function addTask() {
  //recupero il valore nel campo delll'input
  const taskText = input.value

  //Controllo di sicurezza, se l'input è vuoto non fare nulla
  if (taskText.trim() === "") {
    alert("Prima aggiuni qualcosa")
    return
  }

  //creo un nuovo div per contenere il task e il bottone di cancellazione, così da poterli gestire insieme
  const div = document.createElement("div")
  div.className = "task-container"

  //Creo un nuovo elemento <li>
  const span = document.createElement("span")
  span.innerText = taskText

  //Creo un nuovo bottone per poter cancellar il task
  const deleteBtn = document.createElement("button")
  deleteBtn.innerText = "X"
  deleteBtn.className = "delete-btn"

  //Aggiungiamo la logica al bottone per poter cancellare
  deleteBtn.onclick = function () {
    div.remove() //Rimuove l'intero div appena creato
  }

  //Aggiungiamo il click sul testo per segnarlo come "completato"
  span.onclick = function () {
    span.classList.toggle("completed")
  }

  //Mettiamo il bottone "X" dentro il task e il task dentro la lista
  div.appendChild(span)
  div.appendChild(deleteBtn)
  todoList.appendChild(div)

  //Puliamo l'input per il prossimo task
  input.value = ""
}

//Ascoltiamo il click sul bottone
addButton.addEventListener("click", addTask)

//Opzionale: permette di premere "INVIO" dalla tastiera anzi che cliccare sul bottone
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask()
  }
})
