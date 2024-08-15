import React from 'react'

const TaskList = ({tasks}) => {
    return ( 
        <div>
            {tasks.map((task)=><p>{task.body}</p>)}
        </div>
     );
}
 
export default TaskList;