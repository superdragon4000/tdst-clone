import React, {  useState } from "react";
import Spinner from "../UI/Spinner/Spinner";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { useDispatch } from "react-redux";
import { setIsTasksUpdated } from "../../app/reducers/TaskSlice";
import { createTask } from "../../app/reducers/ActionCreators";

const TaskList: React.FC= () => {
  const [newTaskBody, setNewTaskBody] = useState<string>("");
  const {tasks, isTasksLoading} = useSelector((state: RootState) => state.taskReducer)
  const {project} = useSelector((state: RootState) => state.projectReducer)
  const dispatch = useDispatch<AppDispatch>();

  const handleTaskSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      if (project) {
        dispatch(createTask({body: newTaskBody, projectId: project.id}))
      }
      setNewTaskBody('')
      dispatch(setIsTasksUpdated(false))
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
              <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleTaskSubmit(e)}>Add task</button>
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
