/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Task } from 'src/tasks/task.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root@123Admin',
  database: 'taskmanagement',
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: true,
};
