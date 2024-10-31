import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Community } from "../community/community.entity";
import { User } from "../auth/user.entity";
import { PostReaction } from "./post-reaction.entity";

@Entity()
export class Post {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'longtext', nullable: false })
    description: string;
    
    @Column({type: 'varchar', default: 'post', enum: ['post', 'donation', 'goal', 'request']})
    type: string;

    @ManyToOne(() => Community, (community) => community.events, { nullable: true })
    @JoinColumn()
    community: Community;

    @ManyToOne(() => User, (user) => user.posts, { nullable: false }) // Relación con User
    @JoinColumn()
    author: User; // Añadido para establecer la relación

    @OneToMany(() => PostReaction, (postReact) => postReact.post) // Relación con Post
    reactions: PostReaction[]; 

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}