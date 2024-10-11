import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({type: 'varchar', default: 'post'})
    type: string;
}