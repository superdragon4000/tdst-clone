import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../API/TaskService";

interface TaskState {
  tasks: Task[];
  isTasksUpdated: boolean;
}

const initialState: TaskState = {
  tasks: [],
  isTasksUpdated: false,
};

export const taskSlice = createSlice({
  name: "Task",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    setIsTasksUpdated: (state, action: PayloadAction<boolean>) => {
      state.isTasksUpdated = action.payload;
    },
  },
});

export const {setTasks, setIsTasksUpdated} = taskSlice.actions;
export default taskSlice.reducer;
