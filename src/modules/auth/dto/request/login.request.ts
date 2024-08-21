import { IsBoolean, IsEmail, IsString } from "class-validator";

export class LoginRequest{
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsBoolean()
    remember: boolean;
}