import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Credential } from "./Credential";
import { Appointment } from "./Appointment";

@Entity({name: "users"})
export class User {
    @PrimaryGeneratedColumn()
    id_user!: number;
    
    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    birthdate!: string;

    @Column({
        unique:true
    })
    nDni!: number;

    @OneToOne(() => Credential)
    @JoinColumn({name:"id_credential"})
    credential: Credential;

    @OneToMany(()=> Appointment, (appointment)=> appointment.user)
    @JoinColumn({name:"turnos"})
    appointment!: Appointment[];

}
