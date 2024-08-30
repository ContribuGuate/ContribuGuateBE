import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { CommunityService } from "./community.service";
import { AddCommunityRequest } from "./dto/request/add-community.request";
import { AuthGuard } from "src/tools/auth.guard";

@Controller('community')
export class CommunityController{

    constructor(private readonly communityService: CommunityService){}

    @Post('add')
    public async addCommunity(@Body() body: AddCommunityRequest){
        return await this.communityService.addCommunity(body);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get("all")
    public async getCommunities(){
        return await this.communityService.getAllCommunity();
    }


    @UseGuards(AuthGuard)
    @Post('validate-creation')
    public async validateCreation(@Body() body){
        return await this.communityService.validateCreation()
    }


    @Get(':id')
    public async getCommunity(@Param("id") id: string){
        return await this.communityService.getOneCommunity(id);
    }


    @Get('logo/:id')
    public async getLogo(@Param('id') id: string) {
        
    }
}