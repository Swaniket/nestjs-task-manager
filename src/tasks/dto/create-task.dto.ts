/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  desc: string;
}
