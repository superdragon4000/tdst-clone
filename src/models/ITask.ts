import { Project } from "../app/reducers/ProjectSlice";

export interface ITask {
  body: string;
  created_at: Date;
  id: number;
  isDone: Boolean;
  project: Project;
  updated_at: Date;
}
