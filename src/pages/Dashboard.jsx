import React, { useEffect, useState } from "react";
import useFetching from "../hooks/useFetching";
import ProjectService from "../API/ProjectService";
import TaskService from "../API/TaskService";
import ProjectList from "../components/ProjectList/ProjectList";
import TaskList from "../components/TaskList/TaskList";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [fetchProjects, isProjectsLoading, projectsError] = useFetching(
    async () => {
      const response = await ProjectService.getAll();
      setProjects(response.data);
    }
  );

  const [fetchTasks, isTasksLoading, tasksError] = useFetching(async () => {
    const response = await TaskService.getAllById(project.id);
    setTasks(response.data);
  });

  useEffect(() => {
    fetchProjects();
    if (project) {
      fetchTasks();
    }
  }, [project]);

  async function setActiveProject(e) {
    projects.forEach((el) => {
      if (el.name === e.target.innerText) {
        setProject(el);
      }
    });

    document
      .querySelectorAll(".project__link")
      .forEach((btn) => btn.classList.remove("active"));
    e.currentTarget.classList.add("active");
  }
  return (
    <div className="App">
      <ProjectList
        isProjectsLoading={isProjectsLoading}
        projects={projects}
        setActiveProject={setActiveProject}
      />
      <TaskList
        tasks={tasks}
        project={project}
        isTasksLoading={isTasksLoading}
      />
    </div>
  );
};

export default Dashboard;
