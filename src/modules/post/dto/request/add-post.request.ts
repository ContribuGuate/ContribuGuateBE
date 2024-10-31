import { IsNotEmpty, IsString } from "class-validator";

export class AddPostRequest{

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    type: string;


    community: string;
}