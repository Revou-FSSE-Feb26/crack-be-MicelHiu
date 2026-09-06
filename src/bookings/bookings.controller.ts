import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { RolesGuard } from 'src/auth/roles-guard';
import { Roles } from 'src/auth/roles-decorator';
import { CurrentUser } from 'src/auth/current-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}
  @UseGuards(RolesGuard)
  @Roles('admin')
  @Get()
  getCustomerBookings() {
    return this.bookingsService.getCustomerBookings();
  }

  @Get('current')
  getAllBookings(@CurrentUser() user: {id: string}) {
    return this.bookingsService.getAllCarts(user.id);
  }

  @Get(':id')
  getBookingsDetail(@CurrentUser() user: {id: string}, @Param('id') id: string) {
    return this.bookingsService.getBookingsDetail(user.id, id);
  }

  @Post()
  createBooking(@CurrentUser() user: {id: string}, @Body() dto: CreateBookingDto) {
    return this.bookingsService.createBooking(user.id, dto);
  }
}
