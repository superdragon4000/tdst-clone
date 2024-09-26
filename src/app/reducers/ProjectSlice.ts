import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../../API/TaskService";

interface ProjectState {
  project: Project | null;
  projects: Project[];
  isProjectsUpdated: boolean;
}

const initialState: ProjectState = {
  project: null,
  projects: [],
  isProjectsUpdated: false,
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    // setProject: (state, action: PayloadAction<Project | null>) => {
    //   state.project = action.payload;
    // },
    // setProjects: (state, action: PayloadAction<Project[]>) => {
    //   state.projects = action.payload;
    // },
    // setIsProjectsUpdated: (state, action: PayloadAction<boolean>) => {
    //   state.isProjectsUpdated = action.payload;
    // },
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    setProject: (state, action: PayloadAction<Project | null>) => {
      state.project = action.payload;
    },
    setIsProjectsUpdated: (state, action: PayloadAction<boolean>) => {
      state.isProjectsUpdated = action.payload;
    },
  },
});

export const { setProject, setProjects, setIsProjectsUpdated } =
  projectSlice.actions;
export default projectSlice.reducer;
