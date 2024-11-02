import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class AddReactionRequest{

    @IsString()
    @IsNotEmpty()
    reaction: string

    @IsString()
    @IsUUID()
    post: string;
}