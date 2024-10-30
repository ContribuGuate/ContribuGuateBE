import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne,OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Person } from "./person.entity";
import { History } from "../history/history.entity";
import { Post } from "../post/post.entity";
import { PostReaction } from "../post/post-reaction.entity";

@Entity()
export class User{
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({type: 'varchar', nullable: false})
    username: string;

    @Column()
    @Index({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({
        default: true
    })
    active: boolean;

    @OneToOne(() => Person, (person) => person.user)
    @JoinColumn()
    person: Person;

    @OneToMany(() => History, (history) => history.usuario)
    histories: History[];

    @OneToMany(() => PostReaction, (postReact) => postReact.reaction)
    reactions: PostReaction[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    
    @OneToMany(() => Post, (post) => post.author) // Relación con Post
    posts: Post[]; // Añadido para establecer la relación

    // constructor(partial: Partial<User>) {
    //     Object.assign(this, partial);
    // }
}