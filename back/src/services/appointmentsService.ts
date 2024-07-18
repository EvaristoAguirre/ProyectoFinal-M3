import { Appointment, appointmentStatus } from "../entities/Appointment";
import { appointmentRepository } from "../repositories/appointmentRespository";
import { Request, Response} from "express";
import { getUserByIDServices } from "./usersService";
import { userRepository } from "../repositories/userRepository";


export const getAllAppointmentsService = async ():Promise <Appointment[]>  =>{
    const allAppointment = await appointmentRepository.find({
        relations: ['user'],
    });
    return allAppointment;
};

export const getAppointmentByIdService = async (id_appointment:number): Promise <Appointment | null> => {
    const appointmentById = await appointmentRepository.findOne({
        where: {id_appointment},
        relations: ['user']
    });
    if(!appointmentById) throw new Error("El turno no se ha encontrado");
    return appointmentById;
};

export const createAppointmentService = async (req:Request) => {
    const {date, time, id, description} = req.body;
    
    const userOwnerAppointment = await getUserByIDServices(Number(id));
    if(!userOwnerAppointment){
        throw new Error("Usuarix no encontrado")
    }
    const newAppointment: Appointment = await appointmentRepository.create({date, time, description});
    newAppointment.user = Number(id);
    if(!userOwnerAppointment.appointment){
        userOwnerAppointment.appointment = [];
    }

    userOwnerAppointment.appointment.push(newAppointment);
    await userRepository.save(userOwnerAppointment)
    await appointmentRepository.save(newAppointment);
    return newAppointment;
};

export const cancelAppointmentService = async (id_appointment:number) => {
    const appointmentToCancel = await appointmentRepository.findOneBy({id_appointment})
    if(!appointmentToCancel) { throw new Error("El turno no se ha encontrado")}
    
    appointmentToCancel.status = appointmentStatus.CANCELLED
    // await appointmentRepository.update({id}, { status : appointmentStatus.CANCELLED})
    // const appointmentCancelled = await appointmentRepository.findOneBy({id})
    const appointmentCancelled = await appointmentRepository.save(appointmentToCancel)
    return appointmentCancelled;
}