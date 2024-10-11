import { IsEmail, IsString } from "class-validator";

export class RecoverRequest {
    @IsString()
    @IsEmail()
    email: string;
}