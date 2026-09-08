import { Injectable } from "@nestjs/common";
import { CreateCartDto } from "src/carts/dto/create-cart.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { Decimal } from "@prisma/client/runtime/index-browser";
import { booking_status } from "generated/prisma/enums";

@Injectable()
export class BookingRepository {
    constructor(private readonly prisma: PrismaService) {}
    private toTimeDate(time: string): Date {
        return new Date(`1970-01-01T${time}:00.000Z`);
    }

    getCustomerBookings() {
        return this.prisma.bookings.findMany();
    }

    getAllBookings(userId: string) {
        return this.prisma.bookings.findMany({
            where: { user_id: userId }
        });
    }

    getBookingDetails(code: string, userId: string) {
        return this.prisma.bookings.findUnique({
            where: {code, user_id: userId},
            include: {
                rooms: {
                    select: {name: true}
                }
            }
        })
    }

    createBooking(dto: CreateBookingDto & {
        code: string;
        user_id: string;
        room_id: string;
        unit_price: Decimal;
        quantity: number;
        total_price: Decimal;
        date_play: Date;
        time_start: string;
        time_end: string;
        discount_id?: string;
        discount_value?: Decimal;
        status?: booking_status;
    }) {
        return this.prisma.bookings.create({
            data: {
                ...dto,
                status: dto.status ?? 'confirmed',
                time_start: this.toTimeDate(dto.time_start),
                time_end: this.toTimeDate(dto.time_end),
            },
            include: {
                rooms: {
                    select: {
                        name: true,
                        price: true,
                        type: true,
                        image: true,
                    }
                }
            }
        });
    }
}