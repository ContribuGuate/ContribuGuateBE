import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../auth/user.entity";
import { Event } from "../event/event.entity";

@Entity('histories')  
export class History {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'volunteering_description' })  
    descripcionVoluntariado: string;

    @Column({ type: 'date', name: 'participation_date' }) 
    fechaParticipacion: Date;

    
    @ManyToOne(() => User, (user) => user.histories)
    @JoinColumn({ name: 'user_id' })  
    usuario: User;

    
    @ManyToOne(() => Event, (event) => event.histories)
    @JoinColumn({ name: 'event_id' })  
    evento: Event;
}
