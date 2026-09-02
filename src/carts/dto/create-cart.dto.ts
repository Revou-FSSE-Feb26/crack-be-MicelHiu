import { IsDate, IsDecimal, IsNumber, IsString, IsUUID, Matches, Min } from "class-validator"
import { Decimal } from "generated/prisma/internal/prismaNamespace";

export class CreateCartDto {
    @IsUUID()
    user_id!: String;

    @IsString()
    room_id!: String;

    @IsNumber()
    @Min(1)
    quantity!: Number;

    @IsUUID()
    discount_id?: String;      

    @IsDecimal()
    discount_value?: Decimal;
    
    @IsDate()
    date_play!: Date;

    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/, {
        message: 'time must be in format HH:mm or HH:mm:ss',
    })
    time_start!: String;
    
    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/, {
        message: 'time must be in format HH:mm or HH:mm:ss',
    })
    time_end!: String;

    @IsDecimal()
    total_price!: Decimal;     
}