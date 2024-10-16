import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './organization.entity';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [
        TypeOrmModule.forFeature([Organization]),
    ],
    controllers: [
        OrganizationController
    ],
    providers: [
        OrganizationService,
        JwtService
    ]
})
export class OrganizationModule {}
