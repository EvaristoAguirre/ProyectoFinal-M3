import { useState } from 'react';
import styles from './Register.module.css';
import { validateUserData } from '../../helpers/validateRegister';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const POSTUSER_URL = 'http://localhost:3000/users/register';

function Register (){
    const navigate = useNavigate();

    const initialState = {
        name: '',
        email: '',
        birthdate: '',
        nDni: '',
        username: '',
        password: '',
    }

    const [userData, setUserData] = useState(initialState);
    const [errors, setErrors] = useState(initialState);

    console.log(userData)

    const handleInputChange = (event) => {

        setUserData({
            ...userData,
            [event.target.name] : event.target.value
        })
        setErrors(
            validateUserData({
                ...userData,
                [event.target.name] : event.target.value
            })
        )
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        
        const userDataPost = {
                name: userData.name,
                email: userData.email,
                birthdate: userData.birthdate,
                nDni: userData.nDni,
                username: userData.username,
                password: userData.password,
        };

        axios.post(POSTUSER_URL, userDataPost)
        .then(({data}) =>{
            console.log(data);
            alert("Su cuenta se ha creado con éxito. Bienvenidx!!")
            navigate('/home')
        })
        .catch(errors)

        setUserData({
            name: '',
            email: '',
            birthdate: '',
            nDni: '',
            username: '',
            password: '',
        })
    }

    return (
        <div className={styles.contenedor}>
        <h2>Registrate</h2>
        <form onSubmit={handleOnSubmit} className={styles.container}>
            <div className={styles.grupo}>
                <label>Nombre y apellido:</label>
                <input 
                    id = "name"
                    className={styles.grupo_input}
                    type="text" 
                    placeholder="Pedro Pascal"
                    name="name"
                    value = {userData.name}
                    onChange={handleInputChange}
                />
                <p className={styles.msjerror}>{errors.name && errors.name}</p>
            </div>

            <div className={styles.grupo}>
                <label>Email:</label>
                <input 
                    id = "email"
                    className={styles.grupo_input}
                    type="email" 
                    placeholder="correo@mail.com"
                    name="email"
                    value = {userData.email}
                    onChange={handleInputChange}
                />
                <p className={styles.msjerror}>{errors.email && errors.email}</p>
            </div>

            <div className={styles.grupo}>
                <label>Fecha de nacimiento:</label>
                <input 
                    id = "birthdate"
                    className={styles.grupo_input}
                    type="date"
                    placeholder='DD/MM/YYYY'
                    name="birthdate" 
                    value = {userData.birthdate}
                    onChange={handleInputChange}
                />
                <p className={styles.msjerror}>{errors.birthdate && errors.birthdate}</p>
            </div>

            <div className={styles.grupo}>
                <label>Número de documento:</label>
                <input 
                    id = "nDni"
                    className={styles.grupo_input}
                    type="text"
                    placeholder='12.345.678' 
                    name="nDni"
                    value = {userData.nDni}
                    onChange={handleInputChange}
                />
                <p className={styles.msjerror}>{errors.nDni && errors.nDni}</p>
            </div>

            <div className={styles.grupo}>
                <label>Username</label>
                <input 
                    id = "username"
                    className={styles.grupo_input}
                    type="text" 
                    placeholder='Nombre de usuarix'
                    name="username"
                    value = {userData.username}
                    onChange={handleInputChange}
                />
                <p className={styles.msjerror}>{errors.username && errors.username}</p>
            </div>

            <div className={styles.grupo}>
                <label>Password</label>
                <input 
                    id = "password"
                    className={styles.grupo_input}
                    type="password" 
                    placeholder='* * * * * *'
                    name="password"
                    value = {userData.password}
                    onChange={handleInputChange}
                />
                <p className={styles.msjerror}>{errors.password && errors.password}</p>
            </div>
            
            <button 
                className={styles.btn_register}
                type='submit'
                disabled={Object.keys(userData).some(e=> !userData[e])}
            >Registrarme</button>
        </form>
        
        </div>
            
    )
}

export default Register;