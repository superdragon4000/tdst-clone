import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createProject, fetchProjects } from "./ActionCreators";
import { IProject } from "../../models/IProject";

export type Project = {
  created_at: Date;
  updated_at: Date;
  id: number;
  name: string;
}
interface ProjectState {
  project: Project | null;
  projects: Project[];
  isProjectsUpdated: boolean;
  isProjectsLoading: boolean;
  error: string;
}

const initialState: ProjectState = {
  project: null,
  projects: [],
  isProjectsUpdated: false,
  isProjectsLoading: false,
  error: "",
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
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
  extraReducers: (builder) =>  {
    builder
    .addCase(fetchProjects.pending.type, (state) => {
      state.isProjectsLoading = true;
    })
    .addCase(fetchProjects.fulfilled.type, (state, action: PayloadAction<IProject[]>) => {
      state.isProjectsLoading = false;
      state.error = "";
      state.projects = action.payload;
    })
    .addCase(fetchProjects.rejected.type, (state, action: PayloadAction<string>) => {
      state.isProjectsLoading = false;
      state.error = action.payload
    })
    .addCase(createProject.pending.type, (state) => {
      state.isProjectsLoading = true;
    })
    .addCase(createProject.fulfilled.type, (state, action: PayloadAction<IProject>) => {
      state.isProjectsLoading = false;
      state.error = "";
      state.projects.push(action.payload);
    })
    .addCase(createProject.rejected.type, (state, action: PayloadAction<string>) => {
      state.isProjectsLoading = false;
      state.error = action.payload
    })
  }
});

export const { setProject, setProjects, setIsProjectsUpdated } =
  projectSlice.actions;
export default projectSlice.reducer;
