const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const TaskModel = require("./models/Tasks");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/Task-manager");

app.post("/createTask", (req, res) => {
  TaskModel.create(req.body)
    .then((tasks) => res.json(tasks))
    .catch((err) => res.json(err));
});

app.get("/", (req, res) => {
  TaskModel.find({})
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  TaskModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((err) => console.log);
});

app.get("/getTask/:id", (req, res) => {
  const id = req.params.id;
  TaskModel.findById({ _id: id })
    .then((task) => res.json(task))
    .catch((err) => console.log(err));
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  TaskModel.findByIdAndUpdate(
    { _id: id },
    {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
    }
  )
    .then((task) => res.json(task))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("server is running");
});
