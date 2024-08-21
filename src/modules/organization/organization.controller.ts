import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { OrganizationService } from "./organization.service";
import { AddOrganizationRequest } from "./dto/request/add-organization.request";
import { diskStorage } from "multer";
import { extname } from "path";
import { FileInterceptor } from '@nestjs/platform-express';
import {v4 as uuid} from 'uuid';

const storage = diskStorage({
    destination: './uploads/organization',
    filename: (req, file, cb) => {
        const name = file.originalname.split('.')[0];
        const extension = extname(file.originalname);
        const supported = ['.jpg', '.png', '.jpeg'];
        if (supported.some(ext => extension === ext)) {
            cb(null, `${uuid()}${extension}`);
        } else {
            cb(new Error('File not supported'), name);
        }
    },
});


@Controller('organization')
export class OrganizationController {

    constructor(private readonly organizationService: OrganizationService) { }

    @Get('all')
    public async getAllOrganization() {
        return await this.organizationService.getAllOrganization();
    }


    @Post('add')
    @UseInterceptors(FileInterceptor('logo', { storage }))
    public async addOrganization(@Body() body: AddOrganizationRequest, @UploadedFile() file: Express.Multer.File) {
        return await this.organizationService.addOrganization(body, file);
    }

    @Get('logo/:id')
    public async getLogo(@Param('id') id: string) {

    }
}