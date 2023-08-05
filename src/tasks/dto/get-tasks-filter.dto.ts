/* eslint-disable prettier/prettier */
import { ETaskStatus } from '../task-status.enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetTasksFilterDTO {
  @IsOptional()
  @IsIn([ETaskStatus.OPEN, ETaskStatus.IN_PROGRESS, ETaskStatus.DONE])
  status: ETaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
