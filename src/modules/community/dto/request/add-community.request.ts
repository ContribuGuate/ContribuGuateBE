import { IsBoolean, IsBooleanString, IsNotEmpty, IsString } from "class-validator";

export class AddCommunityRequest{

    @IsString()
    @IsNotEmpty()
    name: string;

    description: string;

    @IsBoolean()
    public: boolean;

    password: string;
}