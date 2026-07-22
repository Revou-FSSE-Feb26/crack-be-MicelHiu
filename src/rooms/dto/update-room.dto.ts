import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './create-room.dto';
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
    @IsNotEmpty()
    @IsString()
    id!:string;

    @IsNotEmpty()
    @IsString()
    name!:string;

    @IsNotEmpty()
    @IsString()
    description!:string;

    @IsNotEmpty()
    @IsNumber()
    price!:number;

    @IsNotEmpty()
    @IsString()
    image!: string;

    @IsNotEmpty()
    @IsString()
    category!:string;

    @IsNotEmpty()
    @IsNumber()
    quantity!:number;
}
