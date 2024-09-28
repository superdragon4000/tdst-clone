import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { ITask } from "../models/ITask";


export const taskAPI = createApi({
    reducerPath: "taskAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/",
    }),
    endpoints: (build) => ({
        fetchTasksByProjectId: build.query<ITask[], number>({
            query: (id: number) => ({
                url: "/task/all",
                params: {
                    _id: id
                }
            })
        }),
        createTask: build.mutation<ITask, { body: string, projectId: string }>({
            query: ({ body, projectId }) => ({
                url: "/task/create",
                method: 'POST',
                body: {
                    body,
                    projectId
                }
            })
        })
    })
 
})