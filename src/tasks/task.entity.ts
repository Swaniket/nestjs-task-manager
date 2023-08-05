/* eslint-disable prettier/prettier */
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ETaskStatus } from './task-status.enum';

// @Entity()
// export class Task extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   title: string;

//   @Column()
//   desc: string;

//   @Column()
//   status: ETaskStatus;
// }

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  desc: string;

  @Column()
  status: ETaskStatus;
}
