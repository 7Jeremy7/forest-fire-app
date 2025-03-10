import styles from './styles.module.scss'
import { StatusNotification } from '@/interfaces'


interface Props{
    status: StatusNotification
    msj: string | null
}

export const Notification = ({status, msj}: Props) =>{
    return(
        <div className={`${styles.notification} ${styles[status!]}`}>
            <p>{msj}</p>
        </div>
    )
}