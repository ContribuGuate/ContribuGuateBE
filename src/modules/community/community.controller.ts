import { Body, Controller, Post } from "@nestjs/common";
import { CommunityService } from "./community.service";
import { AddCommunityRequest } from "./dto/request/add-community.request";

@Controller('community')
export class CommunityController{

    constructor(private readonly communityService: CommunityService){}

    @Post('add')
    public async addCommunity(@Body() body: AddCommunityRequest){
        return await this.communityService.addCommunity(body);
    }
}