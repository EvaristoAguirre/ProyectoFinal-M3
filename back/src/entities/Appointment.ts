import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

export enum appointmentStatus {
    ACTIVE = 'active',
    CANCELLED = 'cancelled',        
}

export enum appointmentTime {

}

@Entity({name:"appointments"})
export class Appointment {
    @PrimaryGeneratedColumn()
    id_appointment!: number
    
    @Column()
    date!: string

    @Column()
    time!: string

    @Column({
        type: "enum",
        enum: appointmentStatus,
        default: appointmentStatus.ACTIVE
    })
    status!:appointmentStatus
    
   
    @ManyToOne(()=>User, (user)=>user.appointment)
    @JoinColumn({name:"userId"})
    user!: number

    @Column()
    description!: string

}