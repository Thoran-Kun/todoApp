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

  //Creo un nuovo elemento <li>
  const li = document.createElement("li")
  li.innerText = taskText

  //Creo un nuovo bottone per poter cancellar il task
  const deleteBtn = document.createElement("button")
  deleteBtn.innerText = "X"
  deleteBtn.className = "delete-btn"

  //Aggiungiamo la logica al bottone per poter cancellare
  deleteBtn.onclick = function () {
    li.remove() //Rimuove l'intero li appena creato
  }

  //Aggiungiamo il click sul testo per segnarlo come "completato"
  li.onclick = function () {
    li.classList.toggle("completed")
  }

  //Mettiamo il bottone "X" dentro il task e il task dentro la lista
  li.appendChild(deleteBtn)
  todoList.appendChild(li)

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
