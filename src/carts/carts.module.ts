import { Module } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CartsController } from './carts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CartsRepository } from './carts.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [CartsController],
  providers: [CartsService, CartsRepository],
})
export class CartsModule {}
