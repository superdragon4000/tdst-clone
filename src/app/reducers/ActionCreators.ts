import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IProject } from "../../models/IProject";
import { ITask } from "../../models/ITask";


export interface CreateTaskData {
    body: string;
    projectId: number;
}

export const fetchProjects = createAsyncThunk(
    "project/fetchAll",
    async (__dirname, thunkAPI) => {
        try {
            const response = await axios.get<IProject[]>("http://localhost:5000/project/all")
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить проекты")
        }
    }
)

export const fetchAllTasksByProjectId = createAsyncThunk(
    "task/all",
    async (id: number, thunkAPI) => {
        try {
            const response = await axios.get<ITask[]>("http://localhost:5000/task/all/" + id)
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue('Не удалось загрузить таски')
        }
    }
)

export const createTask= createAsyncThunk(
    "task/create",
    async (data: CreateTaskData, thunkAPI) => {
        const {body, projectId} = data;
        try {
            const response = await axios.post("http://localhost:5000/task/create", {'body': body, 'projectId': projectId})
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue('Не удалось создать таску');
        }
    }
)

export const createProject = createAsyncThunk(
    "project/create",
    async (name: string, thunkAPI) => {
        try {
            const response = await axios.post("http://localhost:5000/project/create", {'name': name})
            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue('Не удалось создать проект');
        }
    }
)