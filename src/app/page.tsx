"use client"

import { Form } from "@/Components/Form";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from "@/hooks/useLoading";

export default function LoginPage() {

  const authFetch = useAuthFetch()

  const {finishLoading, isLoading,startLoading} = useLoading()

  const login = async (formData: Record<string , unknown>) =>{
    startLoading()
    await authFetch({
      endpoint: 'login',
      redirectRoute: 'https://forest-fire-app-production.up.railway.app/home',
      formData
    })  
    finishLoading()
  }

  return (
    <>
    <Form 
    title="Iniciar Sesión" 
    onSubmit={login} 
    description="Formulario para iniciar sesión" 
    >
      <div className="my-[10px] flex flex-col  gap-4"
      >
        <Form.Input
        label="Correo"
        name="email"
        placeholder="Ingresa tu correo..."
        />
      </div>
      <Form.Input
        label="Contraseña"
        name="password"
        placeholder="Ingresa tu contraseña..."
        type="password"
        />
      <Form.SubmitButton buttonText="Iniciar Sesión" isLoading={isLoading}/>
       <Form.Footer 
       description="Olvidaste tu contraseña?"
       link="/forget-password"
       textLink=" Recuperar contraseña" />
       <Form.Footer 
       description="No tienes una cuenta?"
       link="/register"
       textLink=" Registrate aquí" />
    </Form>
    </>
  );
}
