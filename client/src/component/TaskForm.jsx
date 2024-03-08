import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./TaskForm.css";

function TaskForm() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [status, setStatus] = useState();
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/createTask", { title, description, status })
      .then((res) => {
        console.log(res), navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={submitForm}>
        <h4 className="text-success">Add New Form</h4>
        <br />

        <input
          required
          type="text"
          placeholder="title"
          className="w-75 m-2 rounded p-2 border-0"
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          required
          className="w-75 m-2 rounded p-2 border-0"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">status</option>
          <hr />
          <optgroup>
            <option value="Complete">Complete</option>
            <option value="Incomplete">Incomplete</option>
          </optgroup>
        </select>
        <textarea
          required
          type="text"
          placeholder="description"
          className="w-75 h-25 m-2 rounded p-2 border-0"
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <br />

        <button
          className="w-75 p-1 bg-success rounded border-0 text-white"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
