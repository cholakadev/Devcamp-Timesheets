import { ITask } from './task';

export interface IDay {
    id: number;
    day_date: string;
    worked_hours: number;
    tasks: ITask;
    timesheet_id: number;
}


export interface IDayCreate {
    day_date: string;
    worked_hours: number;
}
