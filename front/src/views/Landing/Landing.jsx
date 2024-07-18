import {Link} from 'react-router-dom'
import styles from './Landing.module.css'

function Landing (){


    return(
        <>
        <div className={styles.container}>
            <div className={styles.container2}>
                <h3 className={styles.texto}>¡Bienvenidx!</h3>
                <h2 className={styles.texto}>Sabores de montaña</h2>
                <span className={styles.preg}>¿Es tu primera vez en nuestra página?</span>
                <Link className={styles.navbarLinks} to="/register">
                        <button className={styles.btn}>Creá una cuenta</button>
                </Link>

                <span className={styles.preg}>Si ya estás registradx:</span>
                <Link className={styles.navbarLinks} to="/login">
                    <button className={styles.btn}>Ingresá</button>
                </Link>
            </div>
        </div>
        
        </>
    )

}

export default Landing;