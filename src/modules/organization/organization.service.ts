import { Injectable, Logger, Req } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Organization } from "./organization.entity";
import { Repository } from "typeorm";
import { AddOrganizationRequest } from "./dto/request/add-organization.request";
import { AddOrganizationResponse } from "./dto/response/add-organization.response";
import { GetOrganizationResponse } from "./dto/response/get-organization.response";
import { GetOrganizationsResponse } from "./dto/response/get-organizations.response";
import { GetOrganizationTrackingResponse } from "./dto/response/get-organization.tracking.response";
import { OrganizationHistory } from "./organization-history.entity";
@Injectable()
export class OrganizationService {
    constructor(@InjectRepository(Organization) private readonly organizationRepository: Repository<Organization>,
    @InjectRepository(OrganizationHistory) private readonly organizationHistoryRepository: Repository<OrganizationHistory>) { }

    public async getAllOrganization() {
        const response = new GetOrganizationsResponse();
        try{
            const find = await this.organizationRepository.find({
                where: {
                    approved: true
                }
            });
            response.organizations = find;
            response.success = true;
            response.message = 'Organizaciones encontradas';
            return response;
        }catch(err){
            response.success = false;
            response.message = 'Error al obtener las organizaciones'
            return response;
        }
    }


    public async addOrganization(request: AddOrganizationRequest) {

        const response = new AddOrganizationResponse();
        const organization = new Organization();
        organization.name = request.name;
        organization.description = request.description ?? null;
        organization.image = request.image ?? null;
        organization.website = request.website;
        organization.contact = request.contact;
        organization.address = request.address;


        try {
            await this.organizationRepository.save(organization);

            const creation = await this.organizationHistoryRepository.create();
            creation.label = 'Pendiente';
            creation.state = 'PENDING';
            creation.color = "#FF8000";
            creation.icon = 'pi pi-spin pi-clock';
            creation.description = 'Solicitud enviada';
            creation.organization = organization;
            await this.organizationHistoryRepository.save(creation);
            
            response.organization = organization;
            response.success = true;
            response.message = 'Organizacion creada';
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

    public async getOrganizationTracking(id: string){
        var response = new GetOrganizationTrackingResponse();
        try{
            const find = await this.organizationRepository.createQueryBuilder('organization')
                .leftJoinAndSelect('organization.history', 'organizationHistory')
                .where('organization.uuid = :id', { id })
                .getOne();

            response.organization = find;
            response.success = true;
            response.message = "Tracking de la organizacion";
            return response;
        }catch(err){
            console.log(err)
            response.success = false;
            response.message = "Error al obtener el tracking de la organizacion";
            return response;
        }
    }

}