import React, { useState } from "react";
import Spinner from "../UI/Spinner/Spinner";
import TaskService from "../../API/TaskService";

const TaskList = ({ tasks, project, isTasksLoading, setIsTasksUpdated }) => {
  const [newTaskBody, setNewTaskBody] = useState("");

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await TaskService.create(newTaskBody, project.id);
      setNewTaskBody('')
      setIsTasksUpdated(false)
      console.log("Data submitted:", response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const renderTask = () => {
    if (project) {
      if (isTasksLoading) return <Spinner />;
      else if (tasks.length)
        return (
          <div>
            {tasks.map((task) => (
              <p>{task.body}</p>
            ))}
            <form action="">
              <input
                onChange={(e) => setNewTaskBody(e.target.value)}
                value={newTaskBody}
                type="text"
              />
              <button onClick={(e) => handleTaskSubmit(e)}>Add task</button>
            </form>
          </div>
        );

      return (
        <div>
          <p>no tasks</p>
          <form action="">
            <input
              onChange={(e) => setNewTaskBody(e.target.value)}
              value={newTaskBody}
              type="text"
            />
            <button onClick={(e) => handleTaskSubmit(e)}>Add task</button>
          </form>
        </div>
      );
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
