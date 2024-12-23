import { IsBoolean, IsBooleanString, IsNotEmpty, IsString, IsUrl, IsUUID } from "class-validator";

export class AddCommunityRequest{

    @IsString()
    @IsNotEmpty()
    name: string;

    description: string;

    @IsBoolean()
    public: boolean;

    @IsString()
    @IsUrl()
    image: string;

    password: string;

    @IsUUID()
    @IsString()
    organization: string;
}