import { Column, Entity, ManyToOne, PrimaryGeneratedColumn,OneToMany } from "typeorm";
import { Community } from "../community/community.entity";
import { History } from "../history/history.entity";
@Entity()
export class Event{
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    address: string;

    @Column({ type: 'timestamp'})
    date: Date;

    @Column({ type: 'varchar', length: 255, nullable: true })
    link: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    image: string;

    @ManyToOne(() => Community, (community) => community.events, { nullable: true })
    community: Community;

    @OneToMany(() => History, (history) => history.evento)
    histories: History[];
}