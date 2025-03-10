"use client"

import { Form } from "@/Components/Form";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from "@/hooks/useLoading";

export default function LoginPage() {

  const authFetch = useAuthFetch()

  const {finishLoading, isLoading,startLoading} = useLoading()

  const forgetPassword = async (formData: any) =>{
    startLoading()
    await authFetch({
      endpoint: 'forget-password',
      formData
    })  
    finishLoading()
  }

  return (
    <>
    <Form 
    title="Recupera tu cuenta" 
    onSubmit={forgetPassword} 
    description="Formulario para recuperar tu contraseña" 
    >
      <div className="my-[10px] flex flex-col  gap-4"
      >
        <Form.Input
        label="Correo"
        name="email"
        placeholder="Ingresa tu correo..."
        />
      </div>
      <Form.SubmitButton buttonText="Enviar correo para recuperar tu cuenta" isLoading={isLoading}/>
       <Form.Footer 
       description="Ya tienes cuenta?"
       link="/"
       textLink=" Inicia Sesión" />
    </Form>
    </>
  );
}

