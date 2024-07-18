import { Request, Response } from "express";
import { createAppointmentService, getAllAppointmentsService, getAppointmentByIdService, cancelAppointmentService } from "../services/appointmentsService";
import { Appointment } from "../entities/Appointment";


export const getAllAppointments = async (req:Request,res:Response) => {
    try {
        const appointments: Appointment[] = await getAllAppointmentsService();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(404).json({message: "Turnos no encontrados"});
    }
};

export const getAllAppointmentsByID = async (req:Request,res:Response) => {
    try {
        const {id_appointment} = req.params;
        const appointmentById: Appointment | null = await getAppointmentByIdService(Number(id_appointment));
        res.status(200).json(appointmentById)
    } catch (error) {
        res.status(404).json({message: "El turno no ha sido encontrado"})
    }
};

export const schuleAppointments = async (req:Request,res:Response) => {
    try {
        const newAppointment = await createAppointmentService(req);
        res.status(201).json({message: "El turno ha sido registrado con éxito", newAppointment})
    } catch (error) {
        res.status(400).json({message: "Turno no agendado. Los datos son incorrectos"})
    }
}

export const cancelAppointments = async (req:Request,res:Response) => {
    try {
        const {id_appointment} = req.params;
        const cancelAppointment = await cancelAppointmentService(Number(id_appointment))
        res.status(200).json({message: "El turno ha sido cancelado", cancelAppointment})
    } catch (error) {
        res.status(404).json({message: "No se ha podido cancelar el turno. Los datos son incorrectos"})
    }

};

