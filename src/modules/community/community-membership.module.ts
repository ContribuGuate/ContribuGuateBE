import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommunityMembership } from './community-membership.entity';
import { CommunityMembershipService } from './community-membership.service';
import { CommunityMembershipController } from './community-membership.controller';
import { Community } from '../community/community.entity';
import { User } from '../auth/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommunityMembership, Community, User]),
    JwtModule.register({}), 
  ],
  providers: [CommunityMembershipService,ConfigService],
  controllers: [CommunityMembershipController],
})
export class CommunityMembershipModule {}
