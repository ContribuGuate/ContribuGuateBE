import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Community } from "./community.entity";
import { Repository } from "typeorm";
import { AddCommunityRequest } from "./dto/request/add-community.request";
import { AddCommunityResponse } from "./dto/response/add-community.response";
import { GetCommunitiesResponse } from "./dto/response/get-communities.response";
import { GetCommunityResponse } from "./dto/response/get-community.response";

@Injectable()
export class CommunityService{

    constructor(@InjectRepository(Community) private readonly communityRepository: Repository<Community>){}

    public async getAllCommunity(){
        const response = new GetCommunitiesResponse();

        try{
            response.success = true;
            response.communities = await this.communityRepository
                .createQueryBuilder('community')
                .leftJoinAndSelect('community.organization', 'organization')
                .getMany();
            response.message = 'Comunidades obtenidas';
            return response;
        }catch(err){
            response.success = false;
            response.message = err.message;
            return response;
        }
        
    }

    public async getOneCommunity(id: string){
        const response = new GetCommunityResponse();
        try{
            const find = await this.communityRepository.createQueryBuilder('community')
            .leftJoinAndSelect('community.organization', 'organization')
            .where('community.uuid = :id', { id })
            .getOne();
            if(find){
                response.community = find;
                response.success = true;
                response.message = 'Comunidad encontrada';
                return response;
            }else{
                response.success = false;
                response.message = 'Comunidad no encontrada';
                return response;
            }
        }catch(err){
            response.success = false;
            response.message = 'Error al obtener la comunidad'
            return response;
        }
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


    public async validateCreation(){
    }

    public async getLogo(id: string){
        const find = await this.communityRepository.findOne({
            where: {
                uuid: id
            }
        });

        if(find){

        }
    }

    
}