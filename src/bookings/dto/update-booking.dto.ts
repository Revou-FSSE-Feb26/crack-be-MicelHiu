import { IsEnum, IsOptional, IsString } from "class-validator";
import { booking_status } from "generated/prisma/enums";

export class UpdateBookingDto {
    @IsString()
    @IsOptional()
    guest_name?: string;

    @IsString()
    @IsOptional()
    guest_contact?: string;

    @IsOptional()
    @IsEnum(booking_status)
    status?: booking_status;
}