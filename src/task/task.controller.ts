import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { FindAllParameters, TaskDto } from './task.dto';
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
  findAll(@Query() Params: FindAllParameters): TaskDto[] {
    return this.taskService.findAll(Params);
    
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

  @Delete('/:id')
  remove(@Param('id') id: string) {
    this.taskService.remove(id);
  }
}
