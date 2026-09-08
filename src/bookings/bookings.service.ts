import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingRepository } from './bookings.repository';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CartsRepository } from 'src/carts/carts.repository';

@Injectable()
export class BookingsService {
    constructor(private readonly bookingsRepository: BookingRepository) {}
    private formatTime(date: Date): string {
        return date.toISOString().substring(11, 19);
    }

    private mapBooking(booking: any) {
        return {
            ...booking,
            time_start: this.formatTime(booking.time_start),
            time_end: this.formatTime(booking.time_end)
        };
    }

    private generateBookingCode(): string {
        const today = new Date().toISOString().slice(0, 10).replace(/-/g,''); //YYYYMMDD
        const random = Math.random().toString(36).slice(2,8).toUpperCase(); //6 karakter acak
        return `BK-${today}-${random}`;
    }

    getCustomerBookings() {
        return this.bookingsRepository.getCustomerBookings();
    }

    async getAllBookings(userId: string) {
        const data = await this.bookingsRepository.getAllBookings(userId);
        return data.map(booking => this.mapBooking(booking));
    }

    async getBookingDetail(userId: string, id: string) {
        const data = await this.bookingsRepository.getBookingDetails(id, userId);
        if(!data) throw new NotFoundException('Booking not found');
        return this.mapBooking(data);
    }

    /* buat create logicnya: 
    1. ambil id cart
    2. generate code booking
    3. panggil repository create */
    async createBooking(userId: string, dto: CreateBookingDto) {
        const cart = await this.cartsRepository.getCartById(dto.cart_id, userId);
        if(!cart) throw new NotFoundException('Cart not found');
        
    }
}
