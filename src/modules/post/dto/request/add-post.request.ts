import { IsNotEmpty, IsString } from "class-validator";

export class AddPostRequest{

    @IsString()
    @IsNotEmpty()
    description: string;


    community: string;
}