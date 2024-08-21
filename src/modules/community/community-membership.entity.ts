import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Community } from "./community.entity";
import { User } from "../auth/user.entity";
import { Role } from "../role/role.entity";

@Entity()
export class CommunityMembership{
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @ManyToOne(() => Community, community => community.members, { nullable: false })
    community: Community;

    @ManyToOne(() => User, { nullable: false })
    user: User;

    @ManyToOne(() => Role, { nullable: false })
    role: Role;

    @Column({ type: 'bit', default: true })
    active: boolean;
}