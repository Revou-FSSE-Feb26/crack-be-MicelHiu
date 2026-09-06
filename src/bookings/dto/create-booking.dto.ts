import { IsString } from "class-validator";

export class CreateBookingDto {
    @IsString()
    guest_name!: string;

    @IsString()
    guest_contact!: string;
}