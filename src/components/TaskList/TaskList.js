import React from "react";
import Spinner from "../UI/Spinner/Spinner";

const TaskList = ({ tasks, project, isTasksLoading }) => {
  const renderTask = () => {
    if (project) {
      if (isTasksLoading) return <Spinner />;
      else if (tasks.length)
        return (
          <div>
            {tasks.map((task) => (
              <p>{task.body}</p>
            ))}
          </div>
        );

      return <p>no tasks</p>;
    }

    return <p>select a project</p>;
  };
  return (
    <div className="tasks">
      <h2>Tasks to do:</h2>
      {renderTask()}
    </div>
  );
};

export default TaskList;
