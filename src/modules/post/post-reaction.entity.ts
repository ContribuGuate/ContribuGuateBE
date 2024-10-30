import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./post.entity";
import { User } from "../auth/user.entity";

@Entity()
export class PostReaction {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    reaction: string;

    @ManyToOne(() => Post, (post) => post.reactions, { nullable: false })
    @JoinColumn()
    post: Post;

    @ManyToOne(() => User, (user) => user.reactions, { nullable: false })
    @JoinColumn()
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}