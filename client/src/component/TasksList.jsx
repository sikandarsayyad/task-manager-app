import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./TaskList.css";
import "bootstrap/dist/css/bootstrap.css";

function TasksList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001")
      .then((result) => setTasks(result.data))
      .catch((err) => console.log(err));
  });

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/delete/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h4 className="text-success fw-bold ">Task Management App</h4>
        <Link to="/form">
          <button className="btn btn-info text-white">+ Add New</button>
        </Link>
      </div>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            return (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td>
                  <Link to={`/update/${task._id}`} title="update">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                  <Link onClick={(e) => handleDelete(task._id)} title="delete">
                    <i className="fa-solid fa-trash p-3"></i>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TasksList;
