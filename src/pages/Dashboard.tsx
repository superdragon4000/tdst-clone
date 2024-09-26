import React, { useEffect, useState } from "react";
import useFetching from "../hooks/useFetching";
import ProjectService from "../API/ProjectService";
import TaskService, { Project, Task } from "../API/TaskService";
import ProjectList from "../components/ProjectList/ProjectList";
import TaskList from "../components/TaskList/TaskList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { setProjects, setProject, setIsProjectsUpdated } from '../app/reducers/ProjectSlice';

const Dashboard: React.FC = () => {
  // const [projects, setProjects] = useState<Project[]>([]);
  // const [project, setProject] = useState<Project | null>(null);
  // const [isProjectsUpdated, setIsProjectsUpdated] = useState<Boolean>(false)
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTasksUpdated, setIsTasksUpdated] = useState<Boolean>(false)


  // const dispatch = useDispatch<AppDispatch>()
  const { project, projects, isProjectsUpdated } = useSelector((state: RootState) => state.project)
  const dispatch = useDispatch()

  const [fetchProjects, isProjectsLoading, projectsError] = useFetching(
    async () => {
      const response = await ProjectService.getAll();
      if (response) dispatch(setProjects(response.data));
    }
  );

  const [fetchTasks, isTasksLoading, tasksError] = useFetching(async () => {
    if (project) {
      const response = await TaskService.getAllById(project.id);
      if (response) {
        setTasks(response);
      }
    }
  });

  useEffect(() => {
    if (!isProjectsUpdated) {
      fetchProjects();
      dispatch(setIsProjectsUpdated(true))
    }
    if (project || !isTasksUpdated) {
      fetchTasks();
      setIsTasksUpdated(true)

    }
  }, [project, isProjectsUpdated, isTasksUpdated]);

  async function setActiveProject(e: any) {
    projects.forEach((el) => {
      if (el.name === e.target.innerText) {
        dispatch(setProject(el));
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
        setActiveProject={setActiveProject}
      />
      <TaskList
        tasks={tasks}
        project={project}
        isTasksLoading={isTasksLoading}
        setIsTasksUpdated={setIsTasksUpdated}
      />
    </div>
    
  );
};

export default Dashboard;
