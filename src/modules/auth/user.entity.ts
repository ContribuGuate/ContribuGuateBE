import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne,OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Person } from "./person.entity";
import { History } from "../history/history.entity";

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

    @OneToMany(() => History, (history) => history.usuario)  // Decorador OneToMany para la relación con History
    histories: History[];


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    

    // constructor(partial: Partial<User>) {
    //     Object.assign(this, partial);
    // }
}