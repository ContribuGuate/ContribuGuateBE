import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Community } from "./community.entity";
import { Repository } from "typeorm";
import { AddCommunityRequest } from "./dto/request/add-community.request";
import { AddCommunityResponse } from "./dto/response/add-community.response";

@Injectable()
export class CommunityService{

    constructor(@InjectRepository(Community) private readonly communityRepository: Repository<Community>){}

    getAllCommunity(){
        return this.communityRepository.find();
    }

    public async addCommunity(request: AddCommunityRequest){
        const response = new AddCommunityResponse();

        const community = new Community();
        community.name = request.name;
        community.description = request.description;
        community.public = request.public;
        community.password = request.password ?? null;

        
        try{
            await this.communityRepository.save(community);
            response.community = community;
            response.success = true;
            response.message = 'Community created successfully';
            return response;
        }catch(err){
            response.success = false;
            response.message = err.message;
            return response;
        }
    }

    
}