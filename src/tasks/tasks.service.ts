import { Injectable, NotFoundException } from '@nestjs/common';
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
    console.log(id);
    
    const task = this.tasks.find((item) => item.id === id);
    console.log(task);
    

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }
}
