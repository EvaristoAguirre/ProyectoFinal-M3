import styles from './Navbar.module.css';
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {setUserData} from '../../redux/userSlice'


function Navbar (){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLogged = useSelector(state => state.actualUser.userData.login);
    console.log(isLogged);

    const handleLogout = () => {
        const confirm = window.confirm("Querés cerrar tu sesión?");
        if(confirm) {
            dispatch(setUserData({
                login:false,
                userLogged: {
                    id_user:false,
                },
            }));
            navigate("/");
        }
    }

    return (
        <div className={styles.navbar}>
            <Link to={"/home"}>
                 <span className={styles.navbarLogo}>Sabores de Montaña</span>
            </Link>
            
            <div className={styles.navbarContenedor}>
                <Link className={styles.navbarLinks} to="/home">
                    <span className={styles.navbarLinks}>Inicio</span>
                </Link>

                {isLogged && 
                    (<Link className={styles.navbarLinks} to="/reservar">
                        <span className={styles.navbarLinks}>Hacé tu reserva</span>
                    </Link>)
                }
                {isLogged && 
                    (<Link className={styles.navbarLinks} to="/appointments">
                        <span className={styles.navbarLinks}>Reservas</span>
                    </Link>)
                }

                {
                    isLogged ? (
                        <Link className={styles.navbarLinks}><span onClick={handleLogout}>Logout</span></Link>
                    ) : (
                        <Link to={"/login"} className={styles.navbarLinks}><span>Login</span></Link>
                    )
                }

            </div>
        </div>
    )
}

export default Navbar;