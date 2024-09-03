import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { CommunityService } from "./community.service";
import { AddCommunityRequest } from "./dto/request/add-community.request";
import { AuthGuard } from "src/tools/auth.guard";
import { JoinCommunityResponse } from "./dto/response/join-community.response";
import { JoinCommunityRequest } from "./dto/request/join-community.request";

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
    @UseInterceptors(ClassSerializerInterceptor)
    public async getCommunity(@Param("id") id: string){
        return await this.communityService.getOneCommunity(id);
    }


    @Get('logo/:id')
    public async getLogo(@Param('id') id: string) {
        return await this.communityService.getLogo(id);
    }


    @UseGuards(AuthGuard)
    @Post('join')
    public async join(@Req() req: any, @Body() body: JoinCommunityRequest) {
        return await this.communityService.join(body.uuid, req['user'].sub, body.password);
    }
}