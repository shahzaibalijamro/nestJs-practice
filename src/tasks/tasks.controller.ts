import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Status, Task } from './tasks.model';
import { CreateTaskDto, updateTaskStatusDto } from './dto/tasks.dto';

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
  getTaskById(@Param() params: { id: string }): Task {
    return this.taskService.getSingleTask(params.id);
  }

  @Delete(':id')
  deleteTask(@Param() params: { id: string }): Task {
    return this.taskService.deleteTask(params.id);
  }

  @Put(':id')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() dto: updateTaskStatusDto,
  ): Task {
    return this.taskService.updateTaskStatus(id, dto.status);
  }
}
