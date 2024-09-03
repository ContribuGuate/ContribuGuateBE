import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Community } from './community.entity';
import { CommunityMembership } from './community-membership.entity';
import { CommunityController } from './community.controller';
import { CommunityService } from './community.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from 'src/tools/password.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.entity';
import { Person } from '../auth/person.entity';
import { RoleService } from '../role/role.service';
import { Role } from '../role/role.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Community, CommunityMembership, User, Person, Role])
    ],
    controllers: [CommunityController],
    providers: [CommunityService, JwtService, PasswordService, AuthService, RoleService]
})
export class CommunityModule {}
