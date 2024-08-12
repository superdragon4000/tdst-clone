import { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import "./styles/App.css";

function App() {
  const [task, setTask] = useState({ value: "", isDone: false });
  const [tasks, setTasks] = useState([
    { value: "buy apple", isDone: false },
    { value: "buy bread", isDone: false },
  ]);
  const [project, setProject] = useState({ name: "", tasks: tasks, active: false });
  const [projects, setProjects] = useState([{ name: "Shopping list", tasks: tasks, active: false }]);

  function addProject(e) {
    e.preventDefault();
    setProjects([...projects, project]);
    setProject({ name: "" });
  }

  return (
    <div className="App">
      <div className="projects">
        <div>
          {projects.map((project) => (
            <p className="project__link">{project.name}</p>
          ))}
        </div>
        <form action="">
          <input
            value={project.name}
            onChange={(e) => setProject({ name: e.target.value })}
            type="text"
            name=""
            id=""
          />
          <button onClick={(e) => addProject(e)}>add project</button>
        </form>
      </div>
      <div className="tasks">
        <TaskList tasks={tasks} />
        <TaskForm
          task={task}
          setTask={setTask}
          tasks={tasks}
          setTasks={setTasks}
        />
      </div>
    </div>
  );
}

export default App;
