import { Injectable, NotFoundException } from '@nestjs/common';
import { ETaskStatus, ITask } from './tasks.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  getAllTasks(): ITask[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDTO): ITask[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      const searchTerm = search.toLowerCase();

      tasks = tasks.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm) ||
          task.desc.toLowerCase().includes(searchTerm),
      );
    }

    return tasks;
  }

  getTaskById(id: string): ITask {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  createNewTask(createTaskDto: CreateTaskDTO): ITask {
    const { title, desc } = createTaskDto;

    const task: ITask = {
      id: uuidv4(),
      title,
      desc,
      status: ETaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTaskById(id: string): ITask[] {
    const task = this.getTaskById(id);
    this.tasks = this.tasks.filter((_task) => _task.id !== task.id);
    return this.tasks;
  }

  updateTaskStatus(id: string, status: ETaskStatus): ITask {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
