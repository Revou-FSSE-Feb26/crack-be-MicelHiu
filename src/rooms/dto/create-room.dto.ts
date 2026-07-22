import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRoomDto {
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
