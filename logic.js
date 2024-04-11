const addBtn = document.querySelector('#addBtn');
const newTaskInput = document.querySelector('.wrapper input');
const taskContainer = document.querySelector('.tasks');
const error = document.querySelector('#error');
const countValue = document.querySelector('#taskCount')

let taskCount = 0;

const displayCount = (taskCount) => {
    countValue.innerText = taskCount;
}

const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";
    if (!taskName) {
        setTimeout(() => {
            error.style.display = "block"
        }, 200);
        return;
    }
    // else part
    const task = `<div class="task">
            <input type="checkbox" class="taskCheck">
            <span class="taskName"> ${taskName}</span>
            <button class="edit">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="delete">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>`;

    taskContainer.insertAdjacentHTML("beforeend", task);
    newTaskInput.value="";
    taskCount+=1;
    displayCount(taskCount)

    const deleteButton = document.querySelectorAll(".delete");
    deleteButton.forEach(button => {
        button.onclick = () => {
            button.parentNode.remove();
            taskCount -= 1;
            displayCount(taskCount);
        }
    })

    const editButton = document.querySelectorAll('.edit');
    editButton.forEach(button => {
        button.onclick = (e) => {
            let targetElement = e.target;
            if (!(e.target.className == "`edit")) {
                targetElement = e.target.parentNode;
            }
            console.log(targetElement.previousElementSibling?.innerText);
            newTaskInput.value = targetElement.previousElementSibling?.innerText;
            targetElement.parentNode.remove();
            taskCount -= 1;
            displayCount(taskCount);
        };

    });

    const taskCheck=document.querySelectorAll('.taskCheck');
    taskCheck.forEach((checkBox) =>{
        checkBox.onChange=()=>{
            checkBox.nextElementSibling.classList.toggle("completed");
            if(checkBox.checked){
                taskCount-=1;
            }
            else{
                taskCount+=1;
            }
            displayCount(taskCount);
            newTaskInput.value="";
        }
    })


    window.onload=() =>{
        taskCount=0;
        displayCount(taskCount);
        newTaskInput.value="";
    }

}

addBtn.addEventListener('click', addTask);


