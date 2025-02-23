export class TaskDto {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: string;
  expirationDate: Date;
}

export interface FindAllParameters {
  title: string;
  status: string;
}
