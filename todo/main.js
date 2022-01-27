class Todo {
    addTaskToList(taskText) {
        if (localStorage.getItem('todoTasks')) {
            let tasks = JSON.parse(localStorage.getItem('todoTasks'));
            tasks.push(taskText);
            localStorage.setItem('todoTasks', JSON.stringify(tasks));
        } else {
            localStorage.setItem('todoTasks', JSON.stringify(Array(taskText)));
        }
        this.renderTaskList();
        this.message('Task successfuly added to list', false);
    }
    removeTaskFromList(keyToDelete) {
        let tasks = JSON.parse(localStorage.getItem('todoTasks'));
        tasks.splice(keyToDelete, 1);
        localStorage.setItem('todoTasks', JSON.stringify(tasks));
        this.renderTaskList();
        this.message('Task successfuly removed from list', false);
    }
    renderTaskList() {
        if (localStorage.getItem('todoTasks')) {
            const tasks = JSON.parse(localStorage.getItem('todoTasks'));
            const ul = document.createElement('ul');
            tasks.forEach((element, key) => {
                let li = document.createElement('li');
                ul.appendChild(
                    li
                ).innerHTML = `<span>${element}</span><button class="remove_button" key="${key}">Remove</button>`;
            });
            document.querySelector('.list').innerHTML = '';
            document.querySelector('.list').appendChild(ul);
        }
    }
    /* second argument: true -> errror, false -> success (default) */
    message(messageText, type) {
        const messageEl = document.querySelector('.message p');
        if (type) {
            messageEl.classList.add('error', 'show');
        } else {
            messageEl.classList.add('show');
            messageEl.classList.remove('error');
        }
        messageEl.textContent = messageText;
        setTimeout(() => {
            messageEl.classList.remove('show');
        }, 3000);
    }
}

const todo_list = new Todo();

document.querySelector('.todo_input button').addEventListener('click', () => {
    let taskText = document.querySelector('.todo_input input').value.trim();

    if (taskText) {
        todo_list.addTaskToList(taskText);
        document.querySelector('.todo_input input').value = '';
    } else {
        todo_list.message('Please, enter task!', true);
    }
});

document.querySelector('.list').addEventListener('click', (el) => {
    if (el.target.classList.contains('remove_button')) {
        todo_list.removeTaskFromList(el.target.getAttribute('key'));
    }
});

document.addEventListener('DOMContentLoaded', () => {
    todo_list.renderTaskList();
});
