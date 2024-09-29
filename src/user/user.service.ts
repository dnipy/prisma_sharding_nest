import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: { name: string; email: string }) {
    const client = await this.prisma.writeClient(0);
    return client.user.create({ data : {
      email : data.email,
      name : data.name
    } });
  }

  async findOne(id: number) {
    const client = await this.prisma.readClient(id);
    return client.user.findUnique({ where: { id } });
  }

  async findAll() {
    const client = await this.prisma.readClient(0);
    return client.user.findMany({})
  }

  async update(id: number, data: Partial<{ email: string; password: string }>) {
    const client = await this.prisma.writeClient(id);
    return client.user.update({ where: { id }, data });
  }

  async remove(id: number) {
    const client = await this.prisma.writeClient(id);
    return client.user.delete({ where: { id } });
  }
}