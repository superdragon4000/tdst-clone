import { useEffect, useState } from "react";
import ProjectService from "./API/ProjectService";
import TaskService from "./API/TaskService"
import "./styles/App.css";

function App() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [project, setProject] = useState(null);
  const [isTasksLoading, setIsTasksLoading] = useState(false);
  const [tasks, setTasks] = useState([]);


  async function fetchProjects() {
    setIsLoading(true);
    const response = await ProjectService.getAll();
    setProjects(response.data);
    
    setIsLoading(false);
  }

  async function fetchTasks(id) {
    setIsTasksLoading(true);
    const response = await TaskService.getAllById(id);
    setTasks(response.data);
    
    setIsTasksLoading(false);
  }

   async function setActiveProject(e) {
    projects.forEach(el => {
      if(el.name === e.target.innerText) {
        setProject(el)
      }
    });
    
    document.querySelectorAll('.project__link').forEach( btn =>
      btn.classList.remove('active'))
    e.currentTarget.classList.add('active');
  }

  useEffect(() => {
    fetchProjects();
    if(project) {
      fetchTasks(project.id)
    }
  }, [project]);

  return (
    <div className="App">
      <div className="projects">
        {isLoading ? (
          <p>loading</p>
        ) : (
          projects.map((proj) => <p onClick={e=>setActiveProject(e)} key={proj.id} className="project__link">{proj.name}</p>)
        )}
      </div>
      <div className="tasks">
        {
          isTasksLoading
        }
      </div>
    </div>
  );
}

export default App;
