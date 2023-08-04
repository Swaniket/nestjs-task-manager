/* eslint-disable prettier/prettier */
import { ETaskStatus } from '../tasks.model';

export class GetTasksFilterDTO {
  status: ETaskStatus;
  search: string;
}
