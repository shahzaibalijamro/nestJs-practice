import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Status, Task } from './tasks.model';
import { CreateTaskDto, FilterDto, UpdateTaskStatusDto } from './dto/tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() FilterDto: FilterDto): Task[] {
    return this.taskService.getAllTasks(FilterDto);
  }

  @Post()
  createTasks(@Body() dto: CreateTaskDto) {
    return this.taskService.createTask(dto);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string ): Task {
    return this.taskService.getSingleTask(id);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string ): Task {
    return this.taskService.deleteTask(id);
  }

  @Put(':id')
  updateTaskStatus(
    @Param('id') id: string,
    @Query() dto: UpdateTaskStatusDto,
  ): Task {
    return this.taskService.updateTaskStatus(id, dto.status);
  }
}
