import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { BookingRepository } from './bookings.repository';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [BookingsController],
  providers: [BookingsService, BookingRepository],
})
export class BookingsModule {}
