import { Controller, Get, Delete, UseGuards, Req, Param } from '@nestjs/common';
import { CommunityMembershipService } from './community-membership.service';
import { AuthGuard } from 'src/tools/auth.guard';

@Controller('community-memberships')
export class CommunityMembershipController {
  constructor(private readonly communityMembershipService: CommunityMembershipService) {}

  @UseGuards(AuthGuard)
  @Get('user-communities')
  public async getCommunitiesByUser(@Req() req: any) {
    const userId = req.user.sub;
    console.log(`Mapped {/community-memberships/user-communities, GET} route with user ID: ${userId}`);
    return this.communityMembershipService.getCommunitiesByUser(userId);
  }

  @UseGuards(AuthGuard)
  @Delete('remove/:uuid')
  public async removeCommunityMembershipByUuid(@Param('uuid') uuid: string) {
    console.log(`Mapped {/community-memberships/remove/${uuid}, DELETE} route`);
    return this.communityMembershipService.removeCommunityMembershipByUuid(uuid);
  }

  @UseGuards(AuthGuard)
  @Get('non-member-communities')
  public async getNonMemberCommunities(@Req() req: any) {
    const userId = req.user.sub;
    console.log(`Fetching non-member communities for user ID: ${userId}`);
    return this.communityMembershipService.getNonMemberCommunities(userId);
  }
}
