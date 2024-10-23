import { IsDateString, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class AddEventRequest{
    

    @IsString()
    @IsNotEmpty()
    name: string;

    
    description: string;

    address: string;

    @IsDateString()
    date: Date;

    link: string;

    image: string;

    community: string;
}