import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { CommunityMembership } from './community-membership.entity';
import { Community } from './community.entity';

@Injectable()
export class CommunityMembershipService {
  constructor(
    @InjectRepository(CommunityMembership)
    private communityMembershipRepository: Repository<CommunityMembership>,

    @InjectRepository(Community)
    private communityRepository: Repository<Community>, // Agregamos CommunityRepository para la consulta de comunidades
  ) {}
  async getCommunitiesByUser(userId: string): Promise<{ uuid: string, community: Community }[]> {
    const memberships = await this.communityMembershipRepository.find({
      where: { user: { uuid: userId }, active: true },
      relations: ['community'],
    });
  
    // Filter unique communities and retain the membership UUID
    const uniqueCommunities = Array.from(
      new Map(memberships.map((membership) => [membership.community.uuid, membership])).values()
    ).map((membership) => ({
      uuid: membership.uuid,
      community: membership.community,
    }));
  
    return uniqueCommunities;
  }
  
  // Método para eliminar la membresía de una comunidad por UUID
  async removeCommunityMembershipByUuid(uuid: string): Promise<{ success: boolean; message: string }> {
    const membership = await this.communityMembershipRepository.findOne({
      where: { uuid },
    });

    if (!membership) {
      throw new NotFoundException(`Membership not found with uuid ${uuid}`);
    }

    await this.communityMembershipRepository.remove(membership);

    return { success: true, message: `Membership with uuid ${uuid} removed successfully.` };
  }

  // Nuevo método para obtener las comunidades en las que el usuario no es miembro
  async getNonMemberCommunities(userId: string): Promise<Community[]> {
    // Realizamos una consulta con QueryBuilder para obtener las comunidades en las que el usuario no está
    return this.communityRepository
      .createQueryBuilder('community')
      .where(qb => {
        const subQuery = qb.subQuery()
          .select('membership.communityUuid')
          .from(CommunityMembership, 'membership')
          .where('membership.user.uuid = :userId', { userId })
          .andWhere('membership.active = true')
          .getQuery();
        return 'community.uuid NOT IN ' + subQuery;
      })
      .setParameter('userId', userId)
      .getMany();
  }
}
