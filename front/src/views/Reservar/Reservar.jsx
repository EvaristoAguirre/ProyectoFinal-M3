import { useEffect, useState } from 'react';
import styles from './Reservar.module.css';
import axios from 'axios';
import { validateReservarData } from '../../helpers/validateReservar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const POSTAPPOINTMENTSCHEDULE_URL = 'http://localhost:3000/appointments/schedule';

function Reservar (){

    const navigate = useNavigate();
    const id_loggedUser = useSelector(state => state.actualUser.userData.userLogged.id_user);
    console.log(id_loggedUser)

    useEffect(()=>{
        if(!id_loggedUser){
            navigate("/home");
        }
    }, [id_loggedUser, navigate])

    // const initialState = {
    //     date: '',
    //     time: '',
    //     description:''
    // }

    const initialState ={
        date: "",
        hours: '',
        minutes: '',
        description: '',
    }

    const [appointmentData, setAppointmentData] = useState(initialState);
    const [errors, setErrors] = useState(initialState);

    

    const handleInputChange = (event) => {

        setAppointmentData({
            ...appointmentData,
            [event.target.name] : event.target.value
        })
        setErrors(
            validateReservarData({
                ...appointmentData,
                [event.target.name] : event.target.value
            })
        )
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        
        const appointmentDataPost = {
            date: appointmentData.date,
            time: `${appointmentData.hours}:${appointmentData.minutes}`,
            description: appointmentData.description,
            id:id_loggedUser
        };

        axios.post(POSTAPPOINTMENTSCHEDULE_URL, appointmentDataPost)
        .then(({data}) =>{ 
            console.log(data);
            alert(`Ha sido tomada su reserva: Fecha ${data.newAppointment.date} a las ${data.newAppointment.time}`)
            setAppointmentData(initialState);
            navigate('/appointments');
        })
        .catch((error)=>{
            alert( `Error: ${error.response.data.error}`)
        })
    };
        
    function getTomorrowDate() {
        const today = new Date();
        const todayDateObject = new Date(today);
        todayDateObject.setDate(todayDateObject.getDate() + 1);
        return todayDateObject.toISOString().split("T")[0];
      }

      const validHours = ['11', '12', '13', '14', '15', '20', '21 ', '22','23'];
      const validMinutes = ['00', '30'];
      

    return (
        <div className={styles.contenedor}>
            <h2>Hacé una reserva:</h2>
            <form onSubmit={handleOnSubmit} className={styles.container}>
                
                <div className={styles.grupo}>
                    <label>Día</label>
                    <input 
                        id = "date"
                        className={styles.grupo_input}
                        type="date" 
                        min={getTomorrowDate()}
                        placeholder='Fecha de la reserva'
                        name="date"
                        value = {appointmentData.date}
                        onChange={handleInputChange}
                    />
                    <p className={styles.msjerror}>{errors.date && errors.date}</p>
                </div>

                <div className={styles.grupo}>
                    <label htmlFor='time'>Horario:</label>
                    <select  
                        id = "hours"
                        className={styles.grupo_input}
                        name="hours"
                        value = {appointmentData.hours}
                        onChange={handleInputChange}
                    >
                        { validHours.map((hour)=> <option key={hour} value={hour}>{hour}</option>)}
                    </select>
                    <select  
                        id = "minutes"
                        className={styles.grupo_input}
                        name="minutes"
                        value = {appointmentData.minutes}
                        onChange={handleInputChange}
                    >
                        { validMinutes.map((minutes)=> <option key={minutes} value={minutes}>{minutes}</option>)}
                    </select>
                    
                </div>

                <div className={styles.grupo}>
                    <label>Descripción:</label>
                    <input 
                        id = "description"
                        className={styles.grupo_input}
                        type="textarea" 
                        placeholder='Dejanos cualquier observación que consideres necesaria...'
                        name="description"
                        value = {appointmentData.description}
                        onChange={handleInputChange}
                    />
                </div>
            
                <button 
                    className={styles.btn_register}
                    type='submit'
                    disabled={Object.keys(appointmentData).some(e=> !appointmentData[e])}
                >Reservar</button>
            </form>
        </div>
            
    )
}

export default Reservar;