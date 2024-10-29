import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Community } from "../community/community.entity";

@Entity()
export class Post {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    image: string

    @Column({type: 'varchar', default: 'post'})
    type: string;

    @ManyToOne(() => Community, (community) => community.events, { nullable: true })
    community: Community;
}