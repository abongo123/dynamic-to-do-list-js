// Display a welcome alert when the page loads
alert('WELCOME to do App');

document.addEventListener('DOMContentLoaded', function() {
    // Get references to DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to load tasks from Local Storage
    function loadTasksFromStorage() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Retrieve tasks or use empty array if none
        tasks.forEach(taskText => {
            // Create a new list item for each task
            const newTask = document.createElement('li');
            newTask.textContent = taskText;

            // Create a remove button
            const removeButton = document.createElement('button');
            removeButton.textContent = "Remove";
            removeButton.classList.add('remove-btn');

            // Remove task from DOM and Local Storage
            removeButton.onclick = function() {
                taskList.removeChild(newTask);
                removeTaskFromStorage(taskText);
            };

            newTask.appendChild(removeButton);
            taskList.appendChild(newTask);
        });
    }

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert('Please Enter a task!');
            return;
        }

        const newTask = document.createElement('li');
        newTask.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        removeButton.onclick = function() {
            taskList.removeChild(newTask);
            removeTaskFromStorage(taskText); // Remove task from Local Storage
        };

        newTask.appendChild(removeButton);
        taskList.appendChild(newTask);

        // Save the new task to Local Storage
        saveTaskToStorage(taskText);
        taskInput.value = '';
    }

    // Function to save task to Local Storage
    function saveTaskToStorage(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to remove task from Local Storage
    function removeTaskFromStorage(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Event listeners for adding tasks
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasksFromStorage();
});
