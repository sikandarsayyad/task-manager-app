import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskForm from "./component/TaskForm";
import TasksList from "./component/TasksList";
import UpdateTask from "./component/UpdateTask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TasksList />} />
        <Route path="/form" element={<TaskForm />} />
        <Route path="/update/:id" element={<UpdateTask />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
