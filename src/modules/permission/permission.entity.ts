import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from '../role/role.entity';

@Entity()
export class Permission {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
    name: string; // e.g., 'can_edit_posts', 'can_delete_community'

    @Column({ type: 'text', nullable: true })
    description: string;

    @ManyToMany(() => Role, role => role.permissions)
    roles: Role[];
}
