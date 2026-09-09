import { Injectable, NotFoundException } from '@nestjs/common';
import { BookingRepository } from './bookings.repository';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CartsRepository } from 'src/carts/carts.repository';
import { Decimal } from '@prisma/client/runtime/index-browser';
import { booking_status } from 'generated/prisma/enums';

@Injectable()
export class BookingsService {
    constructor(
        private readonly bookingsRepository: BookingRepository,
        private readonly cartsRepository: CartsRepository
    ) {}
    private formatTime(date: Date): string {
        return date.toISOString().substring(11, 19);
    }

    private mapBooking(booking: any) {
        return {
            ...booking,
            time_start: booking.time_start.toISOString().substring(11, 16);
            time_end: this.formatTime(booking.time_end )
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
        // 1. Ambil cart yang mau di-checkout, harus punya user ini
        const cart = await this.cartsRepository.getCartById(dto.cart_id, userId );
        if (!cart) throw new NotFoundException('Cart not found');

        // 2. Generate kode booking unik
        const code = this.generateBookingCode();

        // 3. Buat booking dari data cart + guest info dari popup
        const booking = await this.bookingsRepository.createBooking({
            code,
            user_id: userId,
            room_id: cart.room_id,
            guest_name: dto.guest_name,
            guest_contact: dto.guest_contact,
            unit_price: cart.total_price.div(cart.quantity), // harga per unit dari total cart
            quantity: cart.quantity,
            total_price: cart.total_price,
            date_play: cart.date_play,
            time_start: this.formatTime(cart.time_start),
            time_end: this.formatTime(cart.time_end),
            discount_id: cart.discount_id ?? undefined,
            discount_value: cart.discount_value ?? undefined,
            status: 'confirmed',
        });

        // 4. Cart sudah "dipindah" jadi booking → hapus dari cart
        await this.cartsRepository.deleteCart(dto.cart_id, userId);

        return this.mapBooking(booking);
    }
}
