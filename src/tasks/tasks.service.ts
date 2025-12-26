import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Status, Task } from './tasks.model';
import { CreateTaskDto } from './dto/tasks.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(dto: CreateTaskDto): Task {
    const { title, description } = dto;
    const newTask = {
      id: Math.floor(Math.random() * 10000000) + 'a',
      title,
      description,
      status: Status.OPEN,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  getSingleTask(id: string): Task {
    const task = this.tasks.find((item) => item.id === id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  deleteTask(id: string): Task {
    const task = this.tasks.find((item) => item.id === id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    const newTasks = this.tasks.filter((item) => item.id !== id);
    this.tasks = newTasks;
    return task;
  }

  updateTaskStatus(id: string, status: Status): Task{
    const task = this.tasks.find((item) => item.id === id);
    if (!task) {
        throw new NotFoundException('Task not found!')
    }
    if (!Object.values(Status).includes(status)) {
        throw new BadRequestException('Invalid status!')
    }
    task.status = status;
    return task;
  }
}
