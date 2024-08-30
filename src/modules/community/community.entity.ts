import { Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Organization } from "../organization/organization.entity";
import { CommunityMembership } from "./community-membership.entity";
import { Exclude } from 'class-transformer';
@Entity()
export class Community{

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    coverImage: string;

    @Column({ type: 'bit', default: true })
    public: boolean;

    @Column({ type: 'varchar', length: 255, nullable: true })
    @Exclude()
    password: string;

    @ManyToOne(() => Organization, organization => organization.communities, { nullable: false })
    organization: Organization;

    @OneToMany(() => CommunityMembership, member => member.community)
    communityMemberships: CommunityMembership[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}