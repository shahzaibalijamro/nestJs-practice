import { Status } from "../tasks.model";

export class CreateTaskDto{
    title: string;
    description: string;
}

export class updateTaskStatusDto{
    status: Status;
}