import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Donation {
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    
}
