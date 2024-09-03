import { IsString, IsUUID } from "class-validator";

export class JoinCommunityRequest{
    @IsUUID()
    uuid: string;

    password?: string;
}