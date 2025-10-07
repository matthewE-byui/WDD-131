let tasks = [];

// Creates HTML for one task
function taskTemplate(task) {
  return `
    <li ${task.completed ? 'class="strike"' : ""}>
      <p>${task.detail}</p>
      <div>
        <span data-action="delete">❎</span>
        <span data-action="complete">✅</span>
      </div>
    </li>`;
}

// Renders all tasks into the UL
function renderTasks(tasks) {
  const listElement = document.querySelector("#todoList");
  listElement.innerHTML = tasks.map(taskTemplate).join("");
}

// Adds a new task
function newTask() {
  const input = document.querySelector("#todo");
  const taskDetail = input.value.trim();

  if (taskDetail === "") return; // Prevent empty tasks

  tasks.push({ detail: taskDetail, completed: false });
  input.value = ""; // Clear the input field
  renderTasks(tasks);
}

// Deletes a task
function removeTask(taskElement) {
  const text = taskElement.querySelector("p").innerText;
  tasks = tasks.filter((task) => task.detail !== text);
  taskElement.remove();
}

// Toggles completion
function completeTask(taskElement) {
  const text = taskElement.querySelector("p").innerText;
  const taskIndex = tasks.findIndex((task) => task.detail === text);
  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  taskElement.classList.toggle("strike");
}

// Handles clicks on ✅ or ❎
function manageTasks(e) {
  const parent = e.target.closest("li");
  if (!parent) return; // clicked outside any <li>

  if (e.target.dataset.action === "delete") {
    removeTask(parent);
  } else if (e.target.dataset.action === "complete") {
    completeTask(parent);
  }
}

// Event listeners
document.querySelector("#submitTask").addEventListener("click", newTask);
document.querySelector("#todoList").addEventListener("click", manageTasks);

// Initial render (empty)
renderTasks(tasks);
