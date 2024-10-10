import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({type: 'varchar', nullable: false, default: 'post', enum: ['post', 'comment', 'donation']})
    type: string;
}