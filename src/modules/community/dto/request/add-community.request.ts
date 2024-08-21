import { IsBooleanString, IsNotEmpty, IsString } from "class-validator";

export class AddCommunityRequest{

    @IsString()
    @IsNotEmpty()
    name: string;

    description: string;

    @IsBooleanString()
    public: boolean;

    password: string;
}