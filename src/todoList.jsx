
import "./TodoList.css";
import { useState } from "react";
import { v4 as uuid4 } from "uuid";

export default function TodoList() {

  // ✅ load from localStorage on first render
  let [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [{ task: "Learn React", id: uuid4(), isDone: false }];
  });

  let [newTodo, setNewTodo] = useState("");

  // ✅ helper — update state AND localStorage together
  let saveTodos = (updatedTodos) => {
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  let addNewTask = () => {
    const updated = [...todos, { task: newTodo, id: uuid4(), isDone: false }];
    saveTodos(updated);
    setNewTodo("");
  };

  let updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  let deleteTodo = (id) => {
    saveTodos(todos.filter((todo) => todo.id !== id));
  };

  let MarkAsDone = (id) => {
    saveTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    ));
  };

  let MarkAllAsDone = () => {
    const allDone = todos.every((todo) => todo.isDone);
    saveTodos(todos.map((todo) => ({ ...todo, isDone: !allDone })));
  };

  const allDone = todos.every((todo) => todo.isDone);

  return (
    <div className="todo-app">
      <h4>TodoList</h4>
      <div className="input-row">
        <input
          placeholder="Enter Task"
          value={newTodo}
          onChange={updateTodoValue}
        />
        <button className="add-btn" onClick={addNewTask}>
          Add Task
        </button>
      </div>
      <hr className="divider" />
      <p className="section-label">Tasks To Do</p>
      <ul className="task-list">
        {todos.map((todo) => (
          <li key={todo.id} className="task-item">
            <span className="task-dot"></span>
            <span className={`task-text ${todo.isDone ? "done" : ""}`}>{todo.task}</span>
            <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>Delete</button>
            <button className="done-btn" onClick={() => MarkAsDone(todo.id)}>Done</button>
          </li>
        ))}
      </ul>
      <br />
    <button className="mark-all-btn" onClick={MarkAllAsDone}>
      {allDone ? "Unmark All" : "Mark All as Done"}
    </button>
    </div>
  );
}
