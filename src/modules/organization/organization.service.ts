import { Injectable, Logger, Req } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Organization } from "./organization.entity";
import { Repository } from "typeorm";
import { AddOrganizationRequest } from "./dto/request/add-organization.request";
import { AddOrganizationResponse } from "./dto/response/add-organization.response";
import { StringDecoder } from "string_decoder";
import { GetOrganizationResponse } from "./dto/response/get-organization.response";
@Injectable()
export class OrganizationService {
    constructor(@InjectRepository(Organization) private readonly organizationRepository: Repository<Organization>) { }

    public async getAllOrganization() {
        return await this.organizationRepository.find();
    }


    public async addOrganization(request: AddOrganizationRequest, file: Express.Multer.File) {

        const response = new AddOrganizationResponse();
        const organization = new Organization();
        organization.name = request.name;
        organization.description = request.description ?? null;
        organization.image = file.filename;
        organization.website = request.website;
        organization.contact = request.contact;
        organization.address = request.address;


        try {
            await this.organizationRepository.save(organization);
            response.organization = organization;
            response.success = true;
            response.message = 'Organization created successfully';
            return response;
        } catch (err) {
            response.success = false;
            response.message = err.message;
            return response;
        }
    }

    public async getOrganization(id: string) {
        const response = new GetOrganizationResponse();
        try{
            const find = await this.organizationRepository.findOne({ where: { uuid: id } });
            if(find){
                response.organization = find;
                response.success = true;
                response.message = 'Organizacion encontrada';
                return response;
            }else{
                response.success = false;
                response.message = 'Organizacion no encontrada';
                return response;
            }
        }catch(err){
            response.success = false;
            response.message = 'Error al obtener la organizacion'
            return response;
        }

    }

}