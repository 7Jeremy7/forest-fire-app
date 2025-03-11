"use client"

import { Form } from "@/Components/Form";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from "@/hooks/useLoading";

export default function LoginPage() {

  const authFetch = useAuthFetch()

  const {finishLoading, isLoading,startLoading} = useLoading()

  const register = async (formData: Record<string, unknown>) =>{
    startLoading()
    await authFetch({
      endpoint: 'register',
      redirectRoute: '/.',
      formData
    })  
    finishLoading()
  }

  return (
    <>
    <Form 
    title="Registrate" 
    onSubmit={register} 
    description="Formulario para crear una cuenta" 
    >
      <div className="my-[10px] flex flex-col  gap-4"
      >
        <Form.Input
        label="Correo"
        name="email"
        placeholder="Ingresa tu correo..."
        />
        <Form.Input
        label="Contraseña"
        name="password"
        placeholder="Ingresa tu contraseña..."
        type="password"
        />
        <Form.Input
        label="Ingresa tu contraseña de nuevo"
        name="confirmPassword"
        placeholder="Repite tu contraseña..."
        type="password"
        />
      </div>
      
      <Form.SubmitButton buttonText="Crear Cuenta" isLoading={isLoading}/>
       <Form.Footer 
       description="Ya tienes cuenta?"
       link="/"
       textLink="Inicia Sesión" />
    </Form>
    </>
  );
}

