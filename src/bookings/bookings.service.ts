import { Injectable } from '@nestjs/common';
import { BookingRepository } from './bookings.repository';

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

    getCustomerBookings() {
        return this.bookingsRepository.getCustomerBookings();
    }

    async getAllBookings(userId: string) {
        const data = await this.bookingsRepository.getAllBookings(userId);
        return data.map(booking => this.mapBooking(booking));
    }
}
