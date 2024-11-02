import { Body, Controller, Get, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { OrganizationService } from "./organization.service";
import { AddOrganizationRequest } from "./dto/request/add-organization.request";

@Controller('organization')
export class OrganizationController {

    constructor(private readonly organizationService: OrganizationService) { }

    @Get('all')
    public async getAllOrganization() {
        return await this.organizationService.getAllOrganization();
    }

    @Post('add')
    public async addOrganization(@Body() body: AddOrganizationRequest) {
        return await this.organizationService.addOrganization(body);
    }

    @Get(':id')
    public async getOrganization(@Param('id') id: string) {
        return await this.organizationService.getOrganization(id);
    }

    @Get('tracking/:id')
    public async getOrganizationTracking(@Param("id") id: string){
        return await this.organizationService.getOrganizationTracking(id);
    }
}