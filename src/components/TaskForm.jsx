import React from "react";

const TaskForm = ({task, setTask, tasks, setTasks}) => {
  function addNewTask(e) {
    e.preventDefault();
    setTasks([...tasks, task]);
    setTask({ ...task, value: "" });
  }

  return (
    <form action="">
      <input
        onChange={(e) => setTask({ ...task, value: e.target.value })}
        value={task.value}
        type="text"
      />
      <button
        onClick={(e) => {
          addNewTask(e);
        }}
      >
        Add Task
      </button>
      <button>Cancel</button>
    </form>
  );
};

export default TaskForm;
