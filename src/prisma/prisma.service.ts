import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaClient as WritePrismaClient } from '../../client/shard1'; 
import { PrismaClient as ReadPrismaClient } from '../../client/shard1_read'; 
import { PrismaClient as WritePrismaClient2 } from '../../client/shard2'; 
import { PrismaClient as ReadPrismaClient2 } from '../../client/shard2_read'; 

@Injectable()
export class PrismaService {
  private readonly writeClients: PrismaClient[] = [
    new WritePrismaClient(), 
    new WritePrismaClient2(), 
  ];

  private readonly readClients: PrismaClient[] = [
    new ReadPrismaClient(), 
    new ReadPrismaClient2(), 
  ];

  private getShardId(userId: number): number {
    // Simple hashing logic to determine shard based on userId
    return userId % this.writeClients.length;
  }

  async writeClient(userId: number): Promise<WritePrismaClient> {
    return this.writeClients[this.getShardId(userId)];
  }

  async readClient(userId: number): Promise<ReadPrismaClient> {
    return this.readClients[this.getShardId(userId)];
  }
}