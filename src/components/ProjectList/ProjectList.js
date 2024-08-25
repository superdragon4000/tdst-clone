import React from "react";
import Spinner from "../UI/Spinner/Spinner";

const ProjectList = ({isProjectsLoading, projects, setActiveProject}) => {
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
    </div>
  );
};

export default ProjectList;
