import React, { useEffect } from "react";
import useFetching from "../hooks/useFetching";
import ProjectService from "../API/ProjectService";
import TaskService from "../API/TaskService";
import ProjectList from "../components/ProjectList/ProjectList";
import TaskList from "../components/TaskList/TaskList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { setProjects, setIsProjectsUpdated } from '../app/reducers/ProjectSlice';
import { setTasks, setIsTasksUpdated } from "../app/reducers/TaskSlice";

const Dashboard: React.FC = () => {
  const { project, isProjectsUpdated } = useSelector((state: RootState) => state.project)
  const { isTasksUpdated } = useSelector((state: RootState) => state.task)
  const dispatch = useDispatch<AppDispatch>()

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
        dispatch(setTasks(response));
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
      dispatch(setIsTasksUpdated(true))
    }
  }, [project, isProjectsUpdated, isTasksUpdated]);


  return (
    <div className="App">
      <ProjectList
        isProjectsLoading={isProjectsLoading}
      />
      <TaskList
        isTasksLoading={isTasksLoading}
      />
    </div>
    
  );
};

export default Dashboard;
