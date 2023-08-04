/* eslint-disable prettier/prettier */
export interface ITask {
  id: string;
  title: string;
  desc: string;
  status: ETaskStatus;
}

export enum ETaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
