/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ETaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectRepository(Task) private taskRepo: Repository<Task>,
  ) {}

  // Get Tasks from the DB
  async getTasks(filterDto: GetTasksFilterDTO, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.taskRepo.createQueryBuilder('task'); // We need a repo for querybuilder

    query.where('task.userId = :userId', { userId: user.id });

    if (status) {
      // :status denotes a variable which is provided in the object in the 2nd argument
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      // We need to use `%${search}%` for partial match
      query.andWhere('(task.title LIKE :search OR task.desc LIKE :search)', {
        search: `%${search}%`,
      });
    }

    const tasks = await query.getMany();
    return tasks;
  }

  // Get tasks by ID from DB
  async getTaskById(id: number, user: User): Promise<Task> {
    const task = await this.entityManager.findOneBy(Task, {
      id: id,
      userId: user.id,
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  // Create New task in DB
  async createNewTask(createTaskDto: CreateTaskDTO, user: User): Promise<Task> {
    const { title, desc } = createTaskDto;

    const task = new Task();

    task.title = title;
    task.desc = desc;
    task.status = ETaskStatus.OPEN;
    task.user = user;
    await this.entityManager.save(task);

    delete task.user;

    return task;
  }

  // Delete a task in DB
  async deleteTaskById(id: number, user: User): Promise<void> {
    const result = await this.entityManager.delete(Task, {
      id: id,
      userId: user.id,
    });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  // Update task status in DB
  async updateTaskStatus(
    id: number,
    status: ETaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.entityManager.save(task);
    return task;
  }
}
