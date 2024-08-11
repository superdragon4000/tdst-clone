import { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
  const [task, setTask] = useState({ value: "", isDone: false });
  const [tasks, setTasks] = useState([]);

  return (
    <div className="App">
      <TaskList tasks={tasks} />
      <TaskForm
        task={task}
        setTask={setTask}
        tasks={tasks}
        setTasks={setTasks}
      />
    </div>
  );
}

export default App;
