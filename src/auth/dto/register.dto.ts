import { IsEmail, IsString, Matches, MaxLength } from "class-validator";

export class RegisterDto {
    @IsString()
    @MaxLength(255)
    full_name!: string;

    @IsString()
    @MaxLength(10)
    nickname!: string;

    @IsEmail()
    email!: string;

    @IsString()
    contact!: string;

    @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8}$/)
    password!: string;
}
