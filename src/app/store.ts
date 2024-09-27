import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./reducers/ProjectSlice";
import taskReducer from "./reducers/TaskSlice";

export const store = configureStore({
  reducer: {
    project: projectReducer,
    task: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
