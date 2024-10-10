import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Permission } from '../permission/permission.entity';

@Entity()
export class Role {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
    name: string; // e.g., 'owner', 'member', 'admin'

    @Column({ type: 'varchar', nullable: true})
    label: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @ManyToMany(() => Permission, permission => permission.roles)
    permissions: Permission[];
}
