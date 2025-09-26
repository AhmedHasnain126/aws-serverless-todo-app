// Paste the Invoke URL from your API Gateway dashboard here
const API_URL = "https://mylpwsxrj2.execute-api.us-east-1.amazonaws.com/";

// Function to add a new task
async function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim();

    if (!taskName) {
        alert('Please enter a task.');
        return;
    }

    await fetch(`${API_URL}/addTask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskName: taskName })
    });

    taskInput.value = ''; // Clear the input field
    loadTasks(); // Refresh the list
}

// Function to delete a task
async function deleteTask(taskId) {
    if (!confirm('Are you sure you want to delete this task?')) {
        return;
    }

    await fetch(`${API_URL}/task/${taskId}`, {
        method: 'DELETE'
    });

    loadTasks(); // Refresh the list
}

// Function to load all tasks from the backend
async function loadTasks() {
    const response = await fetch(`${API_URL}/getTasks`);
    const tasks = await response.json();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Clear the current list

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.taskName;
        li.onclick = () => deleteTask(task.taskId);
        taskList.appendChild(li);
    });
}

// Load tasks when the page first loads
window.onload = loadTasks;