import IUser from "./IUser"

export enum AppointmentStatus {
    ACTIVE = 'active',
    CANCELLED = 'cancelled',
}

interface IAppointment {
    id: number,
    date: string,
    time: string,
    userID: number,
    status: AppointmentStatus,
}

export default IAppointment;