import {IsString, IsNotEmpty, IsBoolean, IsUrl} from 'class-validator'

export class AddOrganizationRequest {
    @IsString()
    @IsNotEmpty()
    name: string

    description: string

    public: boolean

    website: string

    @IsString()
    @IsNotEmpty()
    contact: string

    @IsString()
    @IsUrl()
    image: string;


    address: string
}