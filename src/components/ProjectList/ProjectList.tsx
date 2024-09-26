import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Spinner from "../UI/Spinner/Spinner";
import ProjectService from "../../API/ProjectService";
import { Project } from "../../API/TaskService";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { setIsProjectsUpdated } from '../../app/reducers/ProjectSlice';


interface ProjectListProps {
  isProjectsLoading: boolean;
  // projects: Project[];
  setActiveProject: any;
  // setIsProjectsUpdated: Dispatch<SetStateAction<Boolean>>;
}

const ProjectList: React.FC<ProjectListProps> = ({isProjectsLoading, setActiveProject}) => {
  const [newProjectName, setNewProjectName] = useState('')

  const dispatch = useDispatch<AppDispatch>()
  const { project, projects, isProjectsUpdated } = useSelector((state: RootState) => state.project)

  const handleProjectSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await ProjectService.create(newProjectName)
      setNewProjectName('')
      dispatch(setIsProjectsUpdated(false))
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="projects">
      <h2>Projects</h2>
      {isProjectsLoading ? (
        <Spinner />
      ) : (
        projects.map((proj) => (
          <p
            onClick={(e) => setActiveProject(e)}
            key={proj.id}
            className="project__link"
          >
            {proj.name}
          </p>
        ))
      )}
      <form action="">
        <input onChange={e => setNewProjectName(e.target.value)} value={newProjectName} type="text" />
        <button onClick={e => handleProjectSubmit(e)}>Add project</button>
      </form>
    </div>
  );
};

export default ProjectList;
