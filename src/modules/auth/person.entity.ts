import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Person{

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({type: 'varchar', nullable: true})
    @Index({unique: true})
    cui: string;

    @Column({type: 'varchar', nullable: false})
    firstname: string;

    @Column({type: 'varchar', nullable: true})
    secondname: string;

    @Column({type: 'varchar', nullable: false})
    surname: string;

    @Column({type: 'varchar', nullable: true})
    secondsurname: string;

    @Column({type: 'varchar', nullable: true})
    phone: string;

    @Column({type: 'bit', default: false})
    verified: boolean;

    @OneToOne(() => User, (user) => user.person)
    @JoinColumn()
    user: User;
}