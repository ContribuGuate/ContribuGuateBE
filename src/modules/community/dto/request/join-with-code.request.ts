import { IsString, IsUUID } from "class-validator";

export class JoinCommunityWithCodeRequest{
    @IsString()
    code: string;
}