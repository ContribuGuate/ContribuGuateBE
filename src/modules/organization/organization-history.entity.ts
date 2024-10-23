import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Organization } from "./organization.entity";

@Entity()
export class OrganizationHistory{
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    state: string;

    @Column({ type: 'text', nullable: false })
    label: string;
    
    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'text', nullable: false })
    color: string;

    @Column({ type: 'text', nullable: false })
    icon: string;

    @ManyToOne(() => Organization, (organization) => organization.history)
    organization: Organization;
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}