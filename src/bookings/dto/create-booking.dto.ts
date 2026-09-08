import { IsString, IsUUID } from "class-validator";

export class CreateBookingDto {
    @IsUUID()
    cart_id!: string;

    @IsString()
    guest_name!: string;

    @IsString()
    guest_contact!: string;
}