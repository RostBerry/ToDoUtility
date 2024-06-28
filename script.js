document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task-button');

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTask(task);
        });
    };

    const saveTasks = () => {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(task => {
            tasks.push(task.querySelector('span').textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const addTask = (taskText) => {
        const task = document.createElement('li');
        task.className = 'list-group-item task-item';
        task.innerHTML = `
            <div class="row">
                <div class="col text-left">
                    <span>${taskText}</span>
                </div>
                <div class="col-auto ml-auto">
                    <button class="btn btn-info btn-sm move-up">Up</button>
                    <button class="btn btn-info btn-sm move-down">Down</button>
                    <button class="btn btn-danger btn-sm delete-task">Delete</button>
                </div>
            </div>
        `;
        taskList.appendChild(task);
        saveTasks();
    };

    addTaskButton.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            addTask(taskText);
            newTaskInput.value = '';
        }
    });

    taskList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-task')) {
            const taskItem = event.target.closest('.task-item');
            taskList.removeChild(taskItem);
        } else if (event.target.classList.contains('move-up')) {
            const taskItem = event.target.closest('.task-item');
            if (taskItem.previousElementSibling) {
                taskList.insertBefore(taskItem, taskItem.previousElementSibling);
            }
        } else if (event.target.classList.contains('move-down')) {
            const taskItem = event.target.closest('.task-item');
            if (taskItem.nextElementSibling) {
                taskList.insertBefore(taskItem.nextElementSibling, taskItem);
            }
        }
        saveTasks();
    });

    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskButton.click();
        }
    });

    loadTasks();
});
