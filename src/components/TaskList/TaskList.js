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
    <div className="tasks">{renderTask()}</div>
  );
};

export default TaskList;
