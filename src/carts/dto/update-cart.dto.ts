import { IsDate, IsDecimal, IsNumber, IsString, IsUUID, Matches, Min } from "class-validator"
import { Decimal } from "generated/prisma/internal/prismaNamespace";

export class UpdateCartDto {
    @IsUUID()
    user_id!: string;

    @IsString()
    room_id?: string;

    @IsNumber()
    @Min(1)
    quantity?: number;

    @IsUUID()
    discount_id?: string;      

    @IsDecimal()
    discount_value?: Decimal;
    
    @IsDate()
    date_play?: Date;

    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/, {
        message: 'time must be in format HH:mm or HH:mm:ss',
    })
    time_start?: string;
    
    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)(:([0-5]\d))?$/, {
        message: 'time must be in format HH:mm or HH:mm:ss',
    })
    time_end?: string;

    @IsDecimal()
    total_price?: Decimal;     
}