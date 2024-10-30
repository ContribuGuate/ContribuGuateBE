import { IsNotEmpty, IsString } from "class-validator";

export class AddPostRequest{
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    image: string;

    @IsString()
    @IsNotEmpty()
    type: string;


    community: string;
}