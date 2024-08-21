import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Organization } from "./organization.entity";
import { Repository } from "typeorm";
import { AddOrganizationRequest } from "./dto/request/add-organization.request";
import { AddOrganizationResponse } from "./dto/response/add-organization.response";
import * as nanoid from 'nanoid'

@Injectable()
export class OrganizationService{
    constructor(@InjectRepository(Organization) private readonly organizationRepository: Repository<Organization>){}

    public async getAllOrganization(){
        return await this.organizationRepository.find();
    }


    public async addOrganization(request: AddOrganizationRequest, file: Express.Multer.File){
        
        const response = new AddOrganizationResponse();
        const alpha = nanoid.customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz-', 10);
        const organization = new Organization();
        organization.shortid = alpha(16);
        organization.name = request.name;
        organization.description = request.description;
        organization.image = file.filename;
        organization.website = request.website;
        organization.contact = request.contact;
        organization.address = request.address;
        

        try{
            await this.organizationRepository.save(organization);
            response.organization = organization;
            response.success = true;
            response.message = 'Organization created successfully';
            return response;
        }catch(err){
            response.success = false;
            response.message = err.message;
            return response;
        }


    }
}