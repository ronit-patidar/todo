import "./TodoList.css";
import { useState } from "react";
import { v4 as uuid4 } from "uuid";
export default function TodoList() {
  let [todos, setTodos] = useState([{ task: "Learn React", id: uuid4() }]);
  let [newTodo, setNewTodo] = useState(" ");

  let addNewTask = () => {
    setTodos((prevTodos) => {
      return [...prevTodos, { task: newTodo, id: uuid4() }];
    });
    setNewTodo("");
  };

  let updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  let deleteTodo = (id)=>{
    setTodos((prevTodos)=>todos.filter((prevTodos)=> prevTodos.id != id))
  }

  let btnStyle = {
    marginLeft: "10px",
    border: "2px double green",
    borderRadius: "6px",
  };
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
            <span>{todo.task}</span>
            <button onClick={()=>{deleteTodo(todo.id)}} >Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
