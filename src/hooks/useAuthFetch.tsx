import NotificationContext from "@/context/NotificationContext"
import axios, { AxiosRequestConfig } from "axios"
import { useRouter } from "next/navigation"
import { useContext } from "react"

interface AuthFetchProps {
    endpoint: string
    redirectRoute?:  string
    formData: Record<string, unknown>
    options?:  AxiosRequestConfig<Record<string, unknown>>
}

export function useAuthFetch (){

    const {showNotification} = useContext(NotificationContext)

    const router = useRouter()

    const authRouter = async ({
        endpoint,
        formData,
        redirectRoute,
        options
    }: AuthFetchProps) =>{
        try {
            const {data} = await axios.post(
                `https://forest-fire-app-production.up.railway.app/api/auth/${endpoint}`,
                 formData,
                  options
                )


                 //mostrar notificación 

                 showNotification({
                    msj: data.message,
                    open: true,
                    status: 'success'
                 })


                 if(redirectRoute) router.push(redirectRoute)

        } catch (error) {
            showNotification({
                msj: axios.isAxiosError(error) ? error.response?.data?.message || "Error desconocido" : "Ocurrió un error",
                open: true,
                status: 'error'
             })
        }
    }

    return authRouter
} 
