import React, { useState } from "react";
import Spinner from "../UI/Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { setIsProjectsUpdated } from '../../app/reducers/ProjectSlice';
import { setProject } from "../../app/reducers/ProjectSlice";
import { createProject } from "../../app/reducers/ActionCreators";

const ProjectList: React.FC = () => {
  const [newProjectName, setNewProjectName] = useState('')

  const dispatch = useDispatch<AppDispatch>()
  const { projects, error, isProjectsLoading } = useSelector((state: RootState) => state.projectReducer)

  const handleProjectSubmit = async (e: any) => {
    e.preventDefault();
    try {
      dispatch(createProject(newProjectName))
      setNewProjectName('')
      dispatch(setIsProjectsUpdated(false))
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

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
      {error && <h1>{error}</h1>}
      <form action="">
        <input onChange={e => setNewProjectName(e.target.value)} value={newProjectName} type="text" />
        <button onClick={e => handleProjectSubmit(e)}>Add project</button>
      </form>
    </div>
  );
};

export default ProjectList;
