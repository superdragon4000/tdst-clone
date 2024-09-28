import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createTask, fetchAllTasksByProjectId } from "./ActionCreators";
import { ITask } from "../../models/ITask";
import { Project } from "./ProjectSlice";

export type Task = {
  body: string;
  created_at: Date;
  id: number;
  isDone: Boolean;
  project: Project;
  updated_at: Date;
}
interface TaskState {
  tasks: Task[];
  isTasksUpdated: boolean;
  isTasksLoading: boolean;
  taskError: string;
}

const initialState: TaskState = {
  tasks: [],
  isTasksUpdated: false,
  isTasksLoading: false,
  taskError: '',
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
  extraReducers: (builder) => {
    builder
    .addCase(fetchAllTasksByProjectId.pending.type, (state) => {
      state.isTasksLoading = true;
    })
    .addCase(fetchAllTasksByProjectId.fulfilled.type, (state, action: PayloadAction<ITask[]>) => {
      state.isTasksLoading = false;
      state.taskError= '';
      state.tasks = action.payload;
    })
    .addCase(fetchAllTasksByProjectId.rejected.type, (state, action: PayloadAction<string>) => {
      state.isTasksLoading = false;
      state.taskError = action.payload;
    })
    .addCase(createTask.pending.type, (state) => {
      state.isTasksLoading = true;
    })
    .addCase(createTask.fulfilled.type, (state, action: PayloadAction<ITask>) => {
      state.isTasksLoading = false;
      state.taskError = '';
      state.tasks.push(action.payload);
    })
    .addCase(createTask.rejected.type, (state, action: PayloadAction<string>) => {
      state.isTasksLoading = false;
      state.taskError = action.payload;
    });
  },
});

export const { setTasks, setIsTasksUpdated } = taskSlice.actions;
export default taskSlice.reducer;
