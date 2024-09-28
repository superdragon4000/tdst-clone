import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProject } from "../models/IProject";

export const projectAPI = createApi({
  reducerPath: "projectAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
  }),
  endpoints: (build) => ({
    fetchAllProjects: build.query<IProject[], number>({
      query: () => ({
        url: "/project/all",
      }),
    }),
    createProject: build.mutation<IProject, string>({
      query: (name: string) => ({
        url: "/project/create",
        method: "POST",
        body: {
          name
        }
      })
    })
  }),
});
