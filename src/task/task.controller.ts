import { Controller, Get, Post, Body, Patch, Param, Request, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Body(ValidationPipe) createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body(ValidationPipe) updateTaskDto: UpdateTaskDto, @Request() req) {
    return this.taskService.update(id, updateTaskDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('id')
  remove(@Body('id') id: string | string[], @Request() req) {
    return this.taskService.remove(id, req.user);
  }
}
