const taskTable = document.querySelector('.task-table');
const buttonSubmit = document.querySelector('#solution__form button[type="submit"]');
const inputNameTask = document.getElementById('task-name'); 
const inputDateTask = document.getElementById('task-date'); 
const selectPriorityTask = document.getElementById('task-priority'); 
const textareaTask = document.getElementById('task-description'); 

let task = {
            name: '',
            date: '',
            priority: '',
            description: ''
            }

function fillTask(){
    task.name = inputNameTask.value;
    task.date = inputDateTask.value;
    task.priority = selectPriorityTask.value;
    task.description = textareaTask.value;
}

function addActions(tr){
    let td = document.createElement('td');
    let select = document.createElement('select');
    let deleteOption = document.createElement('option');
    let EditOption = document.createElement('option');
    let button = document.createElement('button');

    deleteOption.value = "Eliminar";
    deleteOption.innerText = "Eliminar";
    EditOption.value = "Editar";
    EditOption.innerText = "Editar";
    button.innerText = "Ejecutar";
    // button.onClick = "executeAction(event)";
    button.addEventListener('click', executeAction);

    select.append(deleteOption, EditOption);
    td.append(select, button);
    tr.appendChild(td);
}

function putTaskInTable(){
    let tbodyTask = taskTable.getElementsByTagName('tbody')[0];
    let tr = document.createElement('tr');
    
    addActions(tr);

    let tds = Object.keys(task).map(
                (key) => {
                    let td = document.createElement('td');
                    td.innerText = task[key];
                    return td
                }
            )
    tr.append(...tds);
    tbodyTask.appendChild(tr);
}

function executeAction(event){
    let ownTr = event.target.closest('tr');
    let ownTd = event.target.closest('td');
    let value = ownTd.getElementsByTagName('select')[0].value
    if (value === "Editar") {
        ownTr.contentEditable = true;
        ownTd.contentEditable = false;
    }

    if (value === "Eliminar") {
        ownTr.remove();
    }
}

function addTask(event) {
    event.preventDefault();
    fillTask();
    putTaskInTable();
}

buttonSubmit.addEventListener('click', addTask);
