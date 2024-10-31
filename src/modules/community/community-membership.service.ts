import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommunityMembership } from './community-membership.entity';

@Injectable()
export class CommunityMembershipService {
  constructor(
    @InjectRepository(CommunityMembership)
    private communityMembershipRepository: Repository<CommunityMembership>,
  ) {}

  async getCommunitiesByUser(userId: string): Promise<CommunityMembership[]> {
    return this.communityMembershipRepository.find({
      where: { user: { uuid: userId }, active: true },
      relations: ['community'],
    });
  }

  async removeCommunityMembership(userId: string, communityId: string): Promise<{ success: boolean; message: string }> {
    const membership = await this.communityMembershipRepository.findOne({
      where: { user: { uuid: userId }, community: { uuid: communityId }, active: true },
    });

    if (!membership) {
      throw new NotFoundException(`Membership not found for user ${userId} in community ${communityId}`);
    }

    await this.communityMembershipRepository.remove(membership);

    return { success: true, message: `Membership in community ${communityId} removed successfully.` };
  }
}
