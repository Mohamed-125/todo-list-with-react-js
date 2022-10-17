import React, { useRef } from "react";
import axios from "axios";
function Form({ setTodos, todos, setSelected }) {
  const inputRef = useRef();
  const formSubmitHandler = (e) => {
    e.preventDefault();
    setTodos([
      ...todos,
      { title: inputRef.current.value, id: Math.random() * 3534556 },
    ]);
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
