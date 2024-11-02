import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Community } from "./community.entity";
import { User } from "../auth/user.entity";
import { Role } from "../role/role.entity";

@Entity()
export class CommunityMembership{
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @ManyToOne(() => Community, community => community.communityMemberships, { nullable: false })
    community: Community;

    @ManyToOne(() => User, { nullable: false })
    user: User;

    @ManyToOne(() => Role, { nullable: false })
    role: Role;

    @Column({ type: 'tinyint', default: true })
    active: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}