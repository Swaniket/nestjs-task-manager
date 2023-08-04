import { Injectable } from '@nestjs/common';
import { ETaskStatus, ITask } from './tasks.model';
import { v4 as uuidv4 } from 'uuid';
import { CreateTaskDTO } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  getAllTasks(): ITask[] {
    return this.tasks;
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
}
