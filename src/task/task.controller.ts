import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TaskDto } from './task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() task: TaskDto) {
    this.taskService.create(task);
  }

  @Get('/:id')
  findById(@Param('id') id: string): TaskDto {
    return this.taskService.findById(id);
  }

  @Get()
  findByStatus(@Query('status') status: string): TaskDto[] {
    console.log(`Buscando tarefas com status: ${status}`);
    return this.taskService.findStatus(status);
    
  }

  @Put()
  update(@Body() task: TaskDto) {
    this.taskService.update(task);
  }
}
