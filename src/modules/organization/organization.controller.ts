import { Body, Controller, Get, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { OrganizationService } from "./organization.service";
import { AddOrganizationRequest } from "./dto/request/add-organization.request";
import { diskStorage } from "multer";
import { extname } from "path";
import { FileInterceptor } from '@nestjs/platform-express';
import {v4 as uuid} from 'uuid';
import { AuthGuard } from "src/tools/auth.guard";

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

    @Get(':id')
    public async getOrganization(@Param('id') id: string) {
        return await this.organizationService.getOrganization(id);
    }
}