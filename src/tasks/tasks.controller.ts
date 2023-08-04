import {
  Body,
  Param,
  Query,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ETaskStatus, ITask } from './tasks.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDTO): ITask[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): ITask {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createNewTask(@Body() createTaskDto: CreateTaskDTO): ITask {
    return this.tasksService.createNewTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): ITask[] {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: ETaskStatus) {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
