import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "./components/Form";
import { FaTrash, FaCheck } from "react-icons/fa";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [selected, setSelected] = useState("All");
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    axios
      .post("https://todo-api-xd.herokuapp.com/api/get")
      .then((result) => setTodos(result.data))
      .catch((res) => console.log(res));
  }, []);

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
    console.log(filteredTodos);
  }, [filteredTodos]);

  return (
    <div>
      <Form setSelected={setSelected} todos={todos} setTodos={setTodos} />
      <div className="todo-container">
        <ul className="todo-list">
          {Array.isArray(filteredTodos) &&
            filteredTodos.map((todo) => {
              return (
                <div className="todo" id={todo._id} key={todo.id}>
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
                        className="fa-trash"
                        onClick={(e) => {
                          axios
                            .post(
                              `https://todo-api-xd.herokuapp.com/api/remove`,
                              {
                                id: e.target.parentNode.parentNode.parentNode
                                  .id,
                              },
                              {
                                headers: {
                                  token: "dontRepeatYourSelf",
                                },
                              }
                            )
                            .then(() =>
                              axios
                                .post(
                                  "https://todo-api-xd.herokuapp.com/api/get"
                                )
                                .then((result) => setTodos(result.data))
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
