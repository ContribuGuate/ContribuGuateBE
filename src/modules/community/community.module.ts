import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Community } from './community.entity';
import { CommunityMembership } from './community-membership.entity';
import { CommunityController } from './community.controller';
import { CommunityService } from './community.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Community, CommunityMembership])
    ],
    controllers: [CommunityController],
    providers: [CommunityService]
})
export class CommunityModule {}
