import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "./components/Form";
import { FaTrash, FaCheck } from "react-icons/fa";
const App = () => {
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos"))
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const [selected, setSelected] = useState("All");
  const [isRendered, setIsRendered] = useState(false);
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    switch (selected) {
      case "C":
        setFilteredTodos(todos.filter((todo) => todo.completed));
        break;
      case "Un":
        setFilteredTodos(todos.filter((todo) => !todo.completed));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }, [todos, selected]);

  useEffect(() => {
    if (isRendered) {
      localStorage.setItem("todos", JSON.stringify(todos));
    } else {
      setIsRendered(true);
    }
  }, [todos]);

  return (
    <div>
      <Form setSelected={setSelected} todos={todos} setTodos={setTodos} />
      <div className="todo-container">
        <ul className="todo-list">
          {Array.isArray(filteredTodos) &&
            filteredTodos.map((todo) => {
              return (
                <div className="todo" id={todo.id} key={todo.id}>
                  <li className="todo-item">
                    {todo.title}
                    <div style={{ display: "flex", gap: "20px" }}>
                      <FaCheck
                        className="fa-check"
                        onClick={(e) => {
                          todo.completed
                            ? (todo.completed = false)
                            : (todo.completed = true);
                          e.target.parentNode.parentNode.classList.toggle(
                            "completed"
                          );
                        }}
                      />
                      <FaTrash
                        id={todo.id}
                        className="fa-trash"
                        onClick={(e) => {
                          setTodos((pre) =>
                            pre.filter((todof) => todof.id !== todo.id)
                          );
                        }}
                      />
                    </div>
                  </li>
                </div>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default App;
