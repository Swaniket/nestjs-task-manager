/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/task.entity';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TasksModule],
  // imports: [TypeOrmModule.forRoot(typeOrmConfig), TasksModule],
})
export class AppModule {}
