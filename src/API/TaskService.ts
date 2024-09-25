import axios, { AxiosResponse } from "axios";

export type Project = {
  created_at: Date;
  updated_at: Date;
  id: number;
  name: string;
}

export type Task = {
  body: string;
  created_at: Date;
  id: number;
  isDone: Boolean;
  project: Project;
  updated_at: Date;
}

export default class TaskService {
  static async getAllById(id: any) {
    const response = await axios
      .get<Task[]>("http://localhost:5000/task/all/" + id)
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      })
      if (response) return response.data
  }

  static async create(body: any, projectId: any) {
    const response = await axios.post("http://localhost:5000/task/create", {'body': body, 'projectId': projectId}).catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
    return response;
  }

  // static async getById(id) {
  //   const response = await axios.get(
  //     `https://jsonplaceholder.typicode.com/posts/${id}`
  //   );
  //   return response;
  // }

  // static async getCommentsByPostId(id) {
  //   const response = await axios.get(
  //     `https://jsonplaceholder.typicode.com/posts/${id}/comments`
  //   );
  //   return response;
  // }
}
