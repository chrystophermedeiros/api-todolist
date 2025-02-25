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
import {
  FindAllParameters,
  TaskDto,
  TaskRouteParams,
  TaskUpdateDto,
} from './task.dto';
import { TaskService } from './task.service';
import { SessionGuard } from 'src/session/session.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('task')
@UseGuards(SessionGuard)
@ApiBearerAuth('token')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova tarefa' })
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
        { message: 'Erro ao criar tarefa' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Busca uma tarefa pelo ID' })
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
  @ApiOperation({ summary: 'Busca todas as tarefas' })
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
  @ApiOperation({ summary: 'Edita uma tarefa' })
  async update(
    @Param() params: TaskRouteParams,
    @Body() task: TaskUpdateDto,
    @Headers('userId') userId: string,
  ) {
    try {
      const updatedTask = await this.taskService.update(
        params.id,
        task,
        userId,
      );
      return {
        message: 'Tarefa editada com sucesso!',
        task: updatedTask,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Erro ao editar tarefa' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Exclui uma tarefa' })
  async remove(@Param('id') id: string, @Headers('userId') userId: string) {
    try {
      return await this.taskService.remove(id, userId);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { message: 'Erro ao excluir a tarefa' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
