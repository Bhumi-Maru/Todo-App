import React, { useState, useEffect } from "react";
import "./TodoApp.css";

export default function TodoApp() {
  const [state, setState] = useState("");
  const [data, setData] = useState(() => {
    const savedData = JSON.parse(localStorage.getItem("TodoData"));
    return savedData || [];
  });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("TodoData", JSON.stringify(data));
  }, [data]);

  function handleChange(e) {
    setState(e.target.value);
  }

  function handleClick(e) {
    e.preventDefault();
    if (editingIndex !== null) {
      const newData = [...data];
      newData[editingIndex] = state;
      setData(newData);
      setEditingIndex(null);
    } else {
      setData([...data, state]);
    }
    setState("");
  }

  function deleteData(index) {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  }

  function updateData(index) {
    setEditingIndex(index);
    setState(data[index]);
  }

  return (
    <div className="todo-container">
      <input
        type="text"
        className="todo-input"
        placeholder="Enter Something..."
        value={state}
        onChange={handleChange}
      />
      <button className="button-89 fw-bold" role="button" onClick={handleClick}>
        {editingIndex !== null ? "Update" : "Add"}
      </button>
      <ul className="todo-list">
        {data.map((el, i) => (
          <li key={i} className="todo-item">
            {el}
            <div>
              <button
                className="button-89 fw-bold"
                role="button"
                onClick={() => deleteData(i)}
              >
                Delete
              </button>

              <button
                className="button-89 fw-bold"
                role="button"
                onClick={() => updateData(i)}
              >
                Update
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
