import { Entity, Column, PrimaryGeneratedColumn, Index, Unique, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Community } from '../community/community.entity';

@Entity()
export class Organization {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;
    
    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    image: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    website: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    contact: string;

    @Column({ type: 'text', nullable: true })
    address: string;

    @Column({ type: 'tinyint', default: false })
    approved: boolean;

    @OneToMany(() => Community, (community) => community.organization)
    communities: Community[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}