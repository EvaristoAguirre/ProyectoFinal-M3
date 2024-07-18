import { useState } from 'react';
import styles from './Login.module.css';
import { validateLoginData } from '../../helpers/validateLogin';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from '../../redux/userSlice';

const POSTUSERLOGIN_URL = 'http://localhost:3000/users/login';

function Login (){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialState = {
        username: '',
        password: '',
    }

    const [user, setUser] = useState(initialState);
    const [errors, setErrors] = useState(initialState);

    console.log(user)

    const handleInputChange = (event) => {

        setUser({
            ...user,
            [event.target.name] : event.target.value
        })
        setErrors(
            validateLoginData({
                ...user,
                [event.target.name] : event.target.value
            })
        )
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        
        const userData = {
                username: user.username,
                password: user.password,
        };
        axios.post(POSTUSERLOGIN_URL, userData)
        .then(({data}) =>{
            console.log(data, "datadatadata");
            dispatch(setUserData(data))
            alert("Usuarix logueadx")
            setUser(initialState);
            navigate("/home")
        })
        .catch((error)=> alert(error?.response?.data?.message));

    }

    return (
        <div className={styles.contenedor}>
        <h2>Logueate</h2>
        <form onSubmit={handleOnSubmit} className={styles.container}>
            
            <div className={styles.grupo}>
                <label>Username</label>
                <input 
                    id = "username"
                    className={styles.grupo_input}
                    type="text" 
                    placeholder='Nombre de usuarix'
                    name="username"
                    value = {user.username}
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
                    value = {user.password}
                    onChange={handleInputChange}
                />
                <p className={styles.msjerror}>{errors.password && errors.password}</p>
            </div>
           
            <button 
                className={styles.btn_register}
                type='submit'
                disabled={Object.keys(user).some(e=> !user[e])}
            >Ingresar</button>
        </form>
        
        
        </div>
            
    )
}

export default Login;