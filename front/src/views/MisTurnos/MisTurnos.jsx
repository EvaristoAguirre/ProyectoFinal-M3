import { useEffect, useState } from "react";
import CardAppointment from "../../components/CardAppointment/CardAppointment";
import axios from 'axios';
import { setUserData , setUserAppointments } from "../../redux/userSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './MisTurnos.module.css'

const GETAPPOINTMENTSBYUSERID_URL = 'http://localhost:3000/users/';
const PUTAPPOINTMENTCANCEL_URL = 'http://localhost:3000/appointments/cancel/';


function MisTurnos (){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLogged = useSelector(state => state.actualUser.userData.login);
    const id_loggedUser = useSelector(state => state.actualUser.userData.userLogged.id_user);
    

    useEffect(()=>{!isLogged && navigate("/home");}, [isLogged])

    useEffect(()=>{
            axios
                .get(GETAPPOINTMENTSBYUSERID_URL + id_loggedUser)
                .then( response => response.data)
                .then(actualUser => {
                    dispatch(setUserAppointments(actualUser.appointment));
                })
                .catch(error=>console.log(error.message));
        }, [id_loggedUser, dispatch]);
        
        
        const handleAppointmentCancel = (id) => {
            axios
            .put(PUTAPPOINTMENTCANCEL_URL + id)
            .then(response => response.data)
            .then((data) => {
                axios
                .get(GETAPPOINTMENTSBYUSERID_URL + id_loggedUser)
                .then( response => response.data)
                .then(actualUser => {
                    dispatch(setUserAppointments(actualUser.appointment));
                })
                .catch(error=>console.log(error.message));

            })
            }
                
                
    const appointmentsActualizados = useSelector(state => state.actualUser.userAppointments)
    console.log(appointmentsActualizados)

    //////esto es lo que voy a probar para ordenar
    
    function compararPorFecha(a, b) {
        const fechaA = new Date(a.fecha);
        const fechaB = new Date(b.fecha);
      
        if (fechaA > fechaB) {
          return -1;
        } else if (fechaA < fechaB) {
          return 1;
        } else {
          return 0;
        }
      }
      
      const appointmentsOrdenados = appointmentsActualizados.slice();
      appointmentsOrdenados.sort(compararPorFecha)
      
      console.log(appointmentsOrdenados);
    
    /////
    return (
        <div className={styles.container}>
            <h1>Mis Reservas:</h1>
            { 
                appointmentsOrdenados.map((turno)=> (
                    <CardAppointment 
                        key={turno.id_appointment} 
                        id={turno.id_appointment}
                        date={turno.date}
                        time={turno.time}
                        status={turno.status}
                        description={turno.description}
                        handleAppointmentCancel={handleAppointmentCancel}
                    />
                ))
                }
        </div>
    )
   }
   
   export default MisTurnos;