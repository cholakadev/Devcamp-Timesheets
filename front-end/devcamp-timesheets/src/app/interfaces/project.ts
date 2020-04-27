import { ITaskCreate } from './task';

export interface IProjects {
    id: number;
    name: string;
    tasks: ITasks[];
}

export interface ITasks {
    id: number;
    name: string;
}

export interface IProjectSelectOption {
    id: number;
    name: string;
    selected: boolean;
    tasks: ITaskSelectOption[];
}

export interface ITaskSelectOption {
    id: number;
    name: string;
    selected: boolean;
}
