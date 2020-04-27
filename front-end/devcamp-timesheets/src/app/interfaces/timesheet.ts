import { IDay } from './day';
import { ITaskCreate } from './task';

export interface ITimesheet {
    id: number|null;
    is_submitted: boolean | null;
    start_date: string;
    days: Array<IDay> | null;
}


export interface ITimesheetCreate {
    id: number;
    is_submitted: boolean;
    start_date: string;
    tasks: ITaskCreate[];
}
