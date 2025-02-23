import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TaskDto } from './task.dto';

@Injectable()
export class TaskService {
  private tasks: TaskDto[] = [];
  create(task: TaskDto) {
    this.tasks.push(task);
    console.log(this.tasks);
  }

  findById(id: string): TaskDto {
    const foundTask = this.tasks.filter((t) => t.id === id);

    if (foundTask.length) {
      return foundTask[0];
    }

    throw new HttpException(
      `Task with id ${id} not found`,
      HttpStatus.NOT_FOUND,
    );
  }
  findStatus(status: string): TaskDto[] {
    const foundTaskStatus = this.tasks.filter(
      (statu) => statu.status === status,
    );

    if (foundTaskStatus.length) {
      return foundTaskStatus;
    }
    console.log(foundTaskStatus);

    throw new HttpException(
      `Task with status ${status} not found`,
      HttpStatus.NOT_FOUND,
    );
  }

  update(task: TaskDto) {
    let index = this.tasks.findIndex((t) => t.id === task.id);
    if (index >= 0) {
      this.tasks[index] = task;
      return;
    }
    throw new HttpException(
      `Task with id ${task.id} not found`,
      HttpStatus.BAD_REQUEST,
    );
  }

  remove(id: string) {
    let taskIndex = this.tasks.findIndex((t) => t.id === id);

    if (taskIndex >= 0) {
      this.tasks.splice(taskIndex, 1)
      return taskIndex[0];
    }

    throw new HttpException(
      `Task with id ${id} not found`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
