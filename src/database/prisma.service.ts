import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService {
  private static readonly prisma = new PrismaClient();
  public client: PrismaClient;

  constructor() {
    this.client = PrismaService.prisma;
  }

  async onModuleDestroy(): Promise<void> {
    await this.client.$disconnect();
  }
}
