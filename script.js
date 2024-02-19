const form = document.querySelector('.todo-form');
const todoList = document.querySelector('.todos');
const inputForm = document.querySelector('.input-todo');
const clearBtn = document.querySelector('.btn-clear');
const todoItems = [];

const getTodo = function () {
  const todo = document.querySelector('.todo');
  todo.addEventListener('click', function (e) {
    todo.classList.toggle('completed');
    updateReload();
  });
};

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const text = inputForm.value.trim();
  if (!text) return;
  const html = `
  <li class="todo">${text}</li>
       
  `;
  todoList.insertAdjacentHTML('afterbegin', html);
  inputForm.value = '';
  getTodo();

  updateReload();
});

const updateReload = function () {
  const todosEl = document.querySelectorAll('li');
  const todos = [];
  todosEl.forEach(todoEl =>
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains('completed'),
    })
  );
  localStorage.setItem('todo', JSON.stringify(todos));
};
clearBtn.addEventListener('click', function () {
  localStorage.clear();
  const list = document.querySelectorAll('li');
  list.forEach(li => li.remove());
});
const items = JSON.parse(localStorage.getItem('todo'));
if (items) {
  items.forEach(el => {
    const html = `<li class="todo ${el.completed ? 'completed' : ''}">${
      el.text
    }</li>`;
    todoList.insertAdjacentHTML('afterbegin', html);
    getTodo();
  });
}
