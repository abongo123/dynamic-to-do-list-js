// Display a welcome alert when the page loads
alert('WELCOME to do App');

// Wait for the DOM content to fully load before running the JavaScript code
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the button, input field, and task list
    const addButton = document.getElementById('add-task-btn'); // Corrected ID
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Check Local Storage for an existing list of tasks
    const storedTasks = localStorage.getItem('tasks'); // Retrieve tasks from Local Storage
    if (storedTasks) {
        const tasksArray = JSON.parse(storedTasks); // Parse tasks into an array

        // Populate the task list with stored tasks
        tasksArray.forEach(taskText => {
            const newTask = document.createElement('li');
            newTask.textContent = taskText;

            // Create a remove button for each stored task
            const removeButton = document.createElement('button');
            removeButton.textContent = "Remove";
            removeButton.classList.add('remove-btn');

            // Define the function to remove the task when the remove button is clicked
            removeButton.onclick = function() {
                taskList.removeChild(newTask); // Remove the task from the list
                saveTasksToLocalStorage(); // Update Local Storage
            };

            // Append the remove button to the task list item
            newTask.appendChild(removeButton);

            // Add the task to the task list
            taskList.appendChild(newTask);
        });
    }

    // Function to save tasks to Local Storage
    function saveTasksToLocalStorage() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(taskItem => {
            tasks.push(taskItem.firstChild.textContent.trim()); // Store only the task text
        });
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks as JSON
    }

    // Function to add a new task to the list
    function addTask() {
        // Get the task input and remove any leading/trailing whitespace
        const taskText = taskInput.value.trim();

        // If the input is empty, prompt the user to enter a task
        if (taskText === "") {
            alert('Please Enter a task!');
            return; // Stop further execution if task is empty
        }

        // Create a new list item for the task
        const newTask = document.createElement('li');
        newTask.textContent = taskText; // Set the text of the task

        // Create a new remove button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove"; // Set the button text
        removeButton.classList.add('remove-btn');
        
        // Define the function to remove the task when the remove button is clicked
        removeButton.onclick = function() {
            taskList.removeChild(newTask); // Remove the task from the list
            saveTasksToLocalStorage(); // Update Local Storage
        };

        // Append the remove button to the task list item
        newTask.appendChild(removeButton);

        // Add the new task to the task list
        taskList.appendChild(newTask);

        // Save tasks to Local Storage
        saveTasksToLocalStorage();

        // Clear the input field after adding the task
        taskInput.value = '';
    }

    // Add an event listener for the "Add Task" button to trigger addTask when clicked
    addButton.addEventListener('click', addTask);

    // Add an event listener for pressing "Enter" in the input field to trigger addTask
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') { // Check if the "Enter" key is pressed
            addTask();
        }
    });
});
