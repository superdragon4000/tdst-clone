import React, { useEffect } from "react";
import ProjectList from "../components/ProjectList/ProjectList";
import TaskList from "../components/TaskList/TaskList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { setIsProjectsUpdated } from '../app/reducers/ProjectSlice';
import { setIsTasksUpdated } from "../app/reducers/TaskSlice";
import { fetchAllTasksByProjectId, fetchProjects } from "../app/reducers/ActionCreators";

const Dashboard: React.FC = () => {
  const { project, isProjectsUpdated } = useSelector((state: RootState) => state.projectReducer)
  const { isTasksUpdated } = useSelector((state: RootState) => state.taskReducer)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (!isProjectsUpdated) {
      dispatch(fetchProjects())
      dispatch(setIsProjectsUpdated(true))
    }
    if (project || !isTasksUpdated) {
      if (project) 
      dispatch(fetchAllTasksByProjectId(project.id))
      dispatch(setIsTasksUpdated(true))
    }
  }, [project, isProjectsUpdated, isTasksUpdated]);


  return (
    <div className="App">
      <ProjectList/>
      <TaskList/>
    </div>
  );
};

export default Dashboard;
