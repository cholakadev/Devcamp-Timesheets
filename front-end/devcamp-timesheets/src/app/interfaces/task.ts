import { IProjects } from './project';
import { IDayCreate } from './day';

export interface ITask {
    id: number;
    name: string;
    projects: IProjects;
}

export interface ITaskCreate {
    id: number;
    name: string;
    project_id: number;
    days: IDayCreate[];
}
