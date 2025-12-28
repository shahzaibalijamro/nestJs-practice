import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Status, Task } from './tasks.model';
import { CreateTaskDto, FilterDto } from './dto/tasks.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(filter: FilterDto): Task[] {
    let tasks = this.tasks;
    const { status, search } = filter;
    if (status) {
      tasks = tasks.filter((item) => item.status === status);
      if (tasks.length === 0) {
        throw new NotFoundException();
      }
    }
    if (search) {
      tasks = tasks.filter(
        (item) =>
          item.description.toLowerCase().includes(search) ||
          item.title.toLowerCase().includes(search),
      );
      if (tasks.length === 0) {
        throw new NotFoundException();
      }
    }
    return tasks;
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
    const task = this.getSingleTask(id);
    const newTasks = this.tasks.filter((item) => item.id !== id);
    this.tasks = newTasks;
    return task;
  }

  updateTaskStatus(id: string, status: Status): Task {
    const task = this.getSingleTask(id);
    task.status = status;
    return task;
  }
}
