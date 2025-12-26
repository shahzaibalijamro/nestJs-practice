import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task } from './tasks.model';
import { CreateTaskDto } from './dto/tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Post()
  createTasks(@Body() dto: CreateTaskDto) {
    return this.taskService.createTask(dto);
  }

  @Get(':id')
  getTaskById(@Param() params: {id: string}): Task {
    return this.taskService.getSingleTask(params.id);
  }
}
