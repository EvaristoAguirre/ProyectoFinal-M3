import {Router} from 'express';
import { getAllAppointments, getAllAppointmentsByID, schuleAppointments, cancelAppointments  } from '../controllers/appointmentsController';


const appointmentsRouter = Router();

appointmentsRouter.get('/', getAllAppointments);
appointmentsRouter.get('/:id_appointment', getAllAppointmentsByID);
appointmentsRouter.post('/schedule', schuleAppointments);
appointmentsRouter.put('/cancel/:id_appointment', cancelAppointments);


export default appointmentsRouter;