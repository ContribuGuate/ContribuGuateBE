import { Injectable, StreamableFile } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Community } from "./community.entity";
import { Equal, Repository } from "typeorm";
import { AddCommunityRequest } from "./dto/request/add-community.request";
import { AddCommunityResponse } from "./dto/response/add-community.response";
import { GetCommunitiesResponse } from "./dto/response/get-communities.response";
import { GetCommunityResponse } from "./dto/response/get-community.response";
import { createReadStream } from "fs";
import { join } from "path";
import { PasswordService } from "src/tools/password.service";
import { JoinCommunityResponse } from "./dto/response/join-community.response";
import { CommunityMembership } from "./community-membership.entity";
import { AuthService } from "../auth/auth.service";
import { RoleService } from "../role/role.service";
import { nanoid } from 'nanoid'
import { Organization } from "../organization/organization.entity";

@Injectable()
export class CommunityService {

    constructor(@InjectRepository(Community) private readonly communityRepository: Repository<Community>,
        @InjectRepository(CommunityMembership) private readonly membershipRepository: Repository<CommunityMembership>,
        @InjectRepository(Organization) private readonly organizationRepository: Repository<Organization>,
        private readonly passwordService: PasswordService,
        private readonly userService: AuthService,
        private readonly roleService: RoleService) { }

    public async getAllCommunity() {
        const response = new GetCommunitiesResponse();

        try {
            response.success = true;
            response.communities = await this.communityRepository
                .createQueryBuilder('community')
                .leftJoinAndSelect('community.organization', 'organization')
                .getMany();
            response.message = 'Comunidades obtenidas';
            return response;
        } catch (err) {
            response.success = false;
            response.message = err.message;
            return response;
        }

    }

    public async getOneCommunity(id: string) {
        const response = new GetCommunityResponse();
        try {
            const find = await this.communityRepository.createQueryBuilder('community')
                .leftJoinAndSelect('community.organization', 'organization')
                .leftJoinAndSelect('community.communityMemberships', 'members')
                .leftJoinAndSelect('members.user', 'user')
                .leftJoinAndSelect('members.role', 'role')
                .leftJoinAndSelect('user.person', 'person')
                .where('community.uuid = :id', { id })
                .getOne();
            if (find) {
                response.community = find;
                response.success = true;
                response.message = 'Comunidad encontrada';
                return response;
            } else {
                response.success = false;
                response.message = 'Comunidad no encontrada';
                return response;
            }
        } catch (err) {
            response.success = false;
            response.message = 'Error al obtener la comunidad'
            return response;
        }
    }

    public async getByCode(code: string) {
        var response = new GetCommunityResponse();
        try {
            const find = await this.communityRepository.createQueryBuilder('community')
                .leftJoinAndSelect('community.organization', 'organization')
                .where('community.code = :code', { code })
                .getOne();
            if (find) {
                response.community = find;
                response.success = true;
                response.message = 'Comunidad encontrada';
                return response;
            } else {
                response.success = false;
                response.message = 'Comunidad no encontrada';
                return response;
            }
        } catch (err) {
            response.success = false;
            response.message = 'Error al obtener la comunidad'
            return response;
        }
    }

    public async addCommunity(request: AddCommunityRequest) {
        const response = new AddCommunityResponse();


        try {
            const community = new Community();
            community.name = request.name;
            community.description = request.description;
            community.public = request.public;
            community.password = request.password ?? null;
            community.code = nanoid(12)
            community.coverImage = request.image ?? null;
            community.organization = await this.organizationRepository.findOne({
                where: {
                    uuid: request.organization
                }
            });
            await this.communityRepository.save(community);
            response.community = community;
            response.success = true;
            response.message = 'Comunidad creada con exito';
            return response;
        } catch (err) {
            response.success = false;
            response.message = err.message;
            return response;
        }
    }


    public async validateCreation() {
    }

    public async getLogo(id: string) {
        const find = await this.communityRepository.findOne({
            where: {
                uuid: id
            }
        });

        if (find) {
            const file = createReadStream(join(process.cwd(), 'uploads\\organization', find.coverImage));
            return new StreamableFile(file, {
                type: 'image/png',
                disposition: `attachment; filename="${find.coverImage}"`,
            });
        } else {

        }
    }


    public async join(id: string, user: string, password: string = null) {
        const response = new JoinCommunityResponse();
        const find = await this.communityRepository.createQueryBuilder('community')
            .leftJoinAndSelect('community.organization', 'organization')
            .where('community.uuid = :id', { id })
            .getOne();

        if (find) {
            const userFind = await this.userService.getUser(user);
            const val = await this.membershipRepository.createQueryBuilder('membership')
                .leftJoinAndSelect('membership.user', 'user')
                .where('membership.communityUuid = :community', { community: find.uuid })
                .andWhere('membership.user = :user', { user: userFind.uuid })
                .andWhere('membership.active = :active', { active: true })
                .getOne();

            if (val) {
                response.success = false;
                response.message = 'Ya eres miembro de esta comunidad';
                response.joined = false;
                return response;
            } else {
                const membership = new CommunityMembership();
                membership.community = find;
                membership.user = userFind;
                membership.role = await this.roleService.getDefaultRole();
                if (find.public == false && find.password != null) {
                    if (password != null) {
                        const comparision = await this.passwordService.comparePassword(password, find.password);

                        if (comparision) {
                            await this.membershipRepository.save(membership);
                            response.success = true;
                            response.joined = true;
                            response.message = 'Te has unido a la comunidad';
                            return response;
                        } else {
                            response.success = false;
                            response.message = 'La clave de seguridad es incorrecta';
                            response.joined = false;
                            return response;
                        }
                    } else {
                        response.success = false;
                        response.message = 'Debes proporcionar la clave de seguridad';
                        response.joined = false;
                        return response;
                    }
                } else {
                    await this.membershipRepository.save(membership);
                    response.success = true;
                    response.joined = true;
                    response.message = 'Te has unido a la comunidad';
                    return response;
                }
            }

        } else {
            response.success = false;
            response.joined = false;
            response.message = 'Comunidad no encontrada';
            return response;
        }
    }


}