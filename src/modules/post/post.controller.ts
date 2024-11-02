import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { PostService } from "./post.service";
import { AddPostRequest } from "./dto/request/add-post.request";
import { AuthGuard } from "src/tools/auth.guard";
import { AddReactionRequest } from "./dto/request/add-reaction.request";

@Controller('post')
export class PostController{

    constructor(private readonly postService: PostService){}
    

    @UseGuards(AuthGuard)
    @Post()
    public async addPost(@Req() req: any,@Body() body: AddPostRequest){
        return await this.postService.addPost(req, body);
    }

    @Get('all')
    public async getPosts(){
        return await this.postService.getPosts();
    }

    @UseGuards(AuthGuard)
    @Post('react')
    public async addReaction(@Req() req: any, @Body() body: AddReactionRequest){
        return await this.postService.addReaction(req, body);
    }
}