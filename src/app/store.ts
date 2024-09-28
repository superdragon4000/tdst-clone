import { combineReducers, configureStore } from "@reduxjs/toolkit";
import projectReducer from "./reducers/ProjectSlice";
import taskReducer from "./reducers/TaskSlice";
import { projectAPI } from "../services/ProjectService";
import { taskAPI } from "../services/TaskService";

const rootReducer = combineReducers({
  projectReducer,
  taskReducer,
  [projectAPI.reducerPath]: projectAPI.reducer,
  [taskAPI.reducerPath]: taskAPI.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(projectAPI.middleware).concat(taskAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']