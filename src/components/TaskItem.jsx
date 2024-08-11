import React from "react";

const TaskItem = (props) => {
  return (
    <div>
      <label>
        <input  type="checkbox" name="checkbox" ></input>
        <span>{props.task.value}</span>
      </label>
    </div>
  );
};

export default TaskItem;
