import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Headers,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FindAllParameters, TaskDto, TaskRouteParams } from './task.dto';
import { TaskService } from './task.service';
import { SessionGuard } from 'src/session/session.guard';

@UseGuards(SessionGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() task: TaskDto) {
    try {
      const createdTask = await this.taskService.create(task);
      return {
        message: 'Tarefa criado com sucesso!',
        task: createdTask,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Erro ao criar tarefa', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/:id')
  async findById(
    @Param('id') id: string,
    @Headers('userId') userId: string,
  ): Promise<TaskDto> {
    if (!userId) {
      throw new HttpException(
        'O userId é obrigatório nos headers',
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.taskService.findById(id, userId);
  }

  @Get()
  async findAll(
    @Query() params: FindAllParameters,
    @Headers('userId') userId: string,
  ): Promise<TaskDto[]> {
    if (!userId) {
      throw new HttpException('userId é obrigatório', HttpStatus.BAD_REQUEST);
    }
    return await this.taskService.findAll(params, userId);
  }

  @Patch('/:id')
  async update(@Param() params: TaskRouteParams, @Body() task: TaskDto) {
    try {
      const updatedTask = await this.taskService.update(params.id, task);
      return {
        message: 'Tarefa editada com sucesso!',
        task: updatedTask,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Erro ao editar tarefa', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/:id')
  async remove(@Param('id') id: string, @Body('userId') userId: string) {
    try {
      return await this.taskService.remove(id, userId);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Erro ao excluir a tarefa', error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
