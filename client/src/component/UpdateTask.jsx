import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./TaskList.css";

function TaskForm() {
  const { id } = useParams();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [status, setStatus] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/getTask/" + id)
      .then((result) => {
        console.log(result);
        setTitle(result.data.title);
        setDescription(result.data.description);
        setStatus(result.data.status);
      })
      .catch((err) => console.log(err));
  }, []);

  const Update = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3001/update/" + id, {
        title,
        description,
        status,
      })
      .then((result) => {
        navigate("/");
        console.log(result);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={Update}>
        <h4 className="text-success">Update Form</h4>
        <br />
        <input
          required
          type="text"
          placeholder="title"
          className="w-75 m-2 rounded p-2 border-0"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          required
          className="w-75 m-2 rounded p-2 border-0"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value={""}>status</option>
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <br />
        <button
          className="w-75 p-1 bg-success rounded border-0 text-white"
          type="submit"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
