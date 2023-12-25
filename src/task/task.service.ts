import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskDto } from './task.dto';
import { PrismaService } from 'prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.task.findMany();
  }

  create(dto: TaskDto) {
    return this.prisma.task.create({ data: dto });
  }

  toggleTaskStatus(id: string) {
    const task = this.prisma.task.findUnique({ where: { id: +id } });
    if (!task) throw new NotFoundException('Task not found');

    return this.prisma.task.update({
      where: { id: +id },
      data: { isDone: !task.isDone },
    });
  }
}
