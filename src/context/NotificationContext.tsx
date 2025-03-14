'use client'

import {Notification} from '@/Components/Notification'
import {createContext, JSX, useState} from 'react'
import { StatusNotification } from '@/interfaces'

interface IState {
    open: boolean
    status: StatusNotification
    msj: string | null
}

interface INotification extends IState{
    showNotification: (props: IState) => void
}

interface Props{
    children: JSX.Element | JSX.Element[]
}

const defaultState: IState = {
    open: false,
    status: null,
    msj: null
}

export const NotificationContext = createContext<INotification>(
    {} as INotification
)

export const NotificationProvider: React.FC<Props> = ({ children }) => {
    const [notification, setNotification] = useState<IState>(defaultState)

    const showNotification = (props: IState) => {
        if(props){
            setNotification(props)


            setTimeout(() =>{
                setNotification({open: false, msj: null, status: null})
            }, 3000)

        }
    }

    return(
        <NotificationContext.Provider value={{...notification, showNotification} }>
        {children}
        {notification.open && (
         <>
        <Notification status={notification.status} msj={notification.msj}/  >
        </>
        )}  
        </NotificationContext.Provider >
    )
}

export default NotificationContext