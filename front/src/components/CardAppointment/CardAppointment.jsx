
import styles from './CardAppointment.module.css'

function CardAppointment({
    id,
    date,
    time,
    description,
    status,
    userId,
    handleAppointmentCancel,
}){

const handleClick = () => {
    if(
        window.confirm("Desea cancelar el turno?")
    ){
        handleAppointmentCancel(id);
    }
};


return (
        <div className={styles.container}>
            <span className={styles.span}>{date}</span>
            <span className={styles.span}>{time}</span>
            <span className={styles.span}>{description}</span>
            {status === 'active' ? (
                <span className={styles.active} onClick={handleClick}>Activo</span>
            ) : (
                <span className={styles.cancelled}>Cancelado</span>
            )}
        </div>
)
}

export default CardAppointment  