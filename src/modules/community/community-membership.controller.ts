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
  @Delete('remove/:communityId')
  public async removeCommunityMembership(@Req() req: any, @Param('communityId') communityId: string) {
    const userId = req.user.sub;
    console.log(`Mapped {/community-memberships/remove/${communityId}, DELETE} route with user ID: ${userId}`);
    return this.communityMembershipService.removeCommunityMembership(userId, communityId);
  }
}
