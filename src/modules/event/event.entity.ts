import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Event{
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({type: 'varchar', nullable: false})
    title: string;

    @Column({type: 'text', nullable: true})
    description: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date: Date;

    @Column({type: 'varchar', nullable: true})
    contact: string;

    @Column({type: 'varchar', nullable: true})
    link: string;
    
}