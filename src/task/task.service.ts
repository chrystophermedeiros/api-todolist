import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  FindAllParameters,
  TaskDto,
  TaskStatusEnum,
  TaskUpdateDto,
} from './task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/db/entites/task.entity';
import { Repository, FindOptionsWhere, Like } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}
  async create(task: TaskDto): Promise<TaskDto> {
    task.title = task.title.toUpperCase();
    task.description = task.description.toUpperCase();

    const existingTask = await this.taskRepository.findOne({
      where: { title: task.title, userId: task.userId },
    });
    if (existingTask) {
      throw new Error('Cada usuário só pode criar um título único.');
    }

    const taskToSave: TaskEntity = {
      title: task.title,
      description: task.description,
      expirationDate: task.expirationDate,
      status: TaskStatusEnum.PENDING,
      userId: task.userId,
    };

    if (task.id) {
      taskToSave.id = task.id;
    }

    const createdTask = await this.taskRepository.save(taskToSave);
    return this.mapEntityToDto(createdTask);
  }

  async findById(id: string, userId: string): Promise<TaskDto> {
    const foundTask = await this.taskRepository.findOne({ where: { id } });

    if (!foundTask) {
      throw new HttpException(
        `Tarefa de id: ${id} não encontrada`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (foundTask.userId !== userId) {
      throw new HttpException(
        `Você não tem permissão para visualizar esta tarefa`,
        HttpStatus.FORBIDDEN,
      );
    }

    return this.mapEntityToDto(foundTask);
  }

  async findAll(params: FindAllParameters, userId: string): Promise<TaskDto[]> {
    const searchTask: FindOptionsWhere<TaskEntity> = { userId };

    if (params.title) {
      searchTask.title = Like(`%${params.title}%`);
    }

    if (params.status) {
      searchTask.status = params.status;
    }

    const tasksFound = await this.taskRepository.find({
      where: searchTask,
    });

    if (tasksFound.length === 0) {
      throw new HttpException(
        'Nenhuma tarefa encontrada para o usuário.',
        HttpStatus.NOT_FOUND,
      );
    }

    return tasksFound.map((taskEntity) => this.mapEntityToDto(taskEntity));
  }

  async update(
    id: string,
    task: TaskUpdateDto,
    userId: string,
  ): Promise<TaskDto> {
    const foundTask = await this.taskRepository.findOne({ where: { id } });

    if (!foundTask) {
      throw new HttpException(
        `Task de id: ${id} não encotrada`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (foundTask.userId !== userId) {
      throw new HttpException(
        `Você não tem permissão para editar esta tarefa`,
        HttpStatus.FORBIDDEN,
      );
    }

    await this.taskRepository.update(id, this.mapDtoToEntity(task));

    const updatedTask = await this.taskRepository.findOne({ where: { id } });

    if (!updatedTask) {
      throw new HttpException(
        `Erro ao recuperar a tarefa atualizada`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return this.mapEntityToDto(updatedTask);
  }

  async remove(id: string, userId: string) {
    const foundTask = await this.taskRepository.findOne({ where: { id } });

    if (!foundTask) {
      throw new HttpException(
        `Tarefa de id: ${id} não encontrada`,
        HttpStatus.NOT_FOUND,
      );
    }

    if (foundTask.userId !== userId) {
      throw new HttpException(
        `Você não tem permissão para excluir esta tarefa`,
        HttpStatus.FORBIDDEN,
      );
    }

    const result = await this.taskRepository.delete(id);

    if (!result.affected) {
      throw new HttpException(
        `Erro ao excluir a tarefa`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return { message: 'Tarefa excluída com sucesso!' };
  }

  private mapEntityToDto(taskEntity: TaskEntity): TaskDto {
    return {
      id: taskEntity.id,
      title: taskEntity.title,
      description: taskEntity.description,
      status: taskEntity.status as TaskStatusEnum,
      expirationDate: taskEntity.expirationDate,
      userId: taskEntity.userId,
    };
  }

  private mapDtoToEntity(taskDto: TaskUpdateDto): Partial<TaskEntity> {
    return {
      title: taskDto.title,
      description: taskDto.description,
      status: taskDto.status,
      expirationDate: taskDto.expirationDate,
    };
  }
}
