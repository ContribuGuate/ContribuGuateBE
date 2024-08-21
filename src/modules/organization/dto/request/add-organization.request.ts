import {IsString, IsNotEmpty, IsBoolean} from 'class-validator'

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


    address: string
}