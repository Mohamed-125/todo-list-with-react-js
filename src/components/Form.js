import React, { useRef } from "react";
import axios from "axios";
function Form({ setTodos, todos, setSelected }) {
  const inputRef = useRef();
  const formSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://todo-api-xd.herokuapp.com/api/add",
        {
          title: inputRef?.current.value,
          date: Math.floor(Math.random() * 188823238 + 1),
          completed: false,
        },
        {
          headers: {
            token: "dontRepeatYourSelf",
          },
        }
      )
      .then(() =>
        axios
          .post("https://todo-api-xd.herokuapp.com/api/get")
          .then((result) => setTodos(result.data))
      );

    inputRef.current.value = null;
  };
  return (
    <form onSubmit={formSubmitHandler}>
      <input ref={inputRef} required type="text" />
      <div className="select">
        <select
          onChange={(e) => setSelected(e.target.value)}
          name="todos"
          className="filter-todo"
        >
          <option value="All">All</option>
          <option value="C">Completed</option>
          <option value="Un">Uncompleted</option>
        </select>
      </div>
    </form>
  );
}

export default Form;
