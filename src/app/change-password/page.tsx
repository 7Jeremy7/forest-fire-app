"use client";
import { Suspense } from "react";
import { Form } from "@/Components/Form";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from "@/hooks/useLoading";
import { AxiosRequestConfig } from "axios";
import { useSearchParams } from "next/navigation";

function ChangePasswordForm() {
  const { finishLoading, isLoading, startLoading } = useLoading();
  const authFetch = useAuthFetch();
  const searchParams = useSearchParams();

  const forgetPassword = async (formData: Record<string, unknown>) => {
    startLoading();

    const token = searchParams.get("token");

    const options: AxiosRequestConfig<Record<string, unknown>> = {
      headers: {
        token,
      },
    };

    await authFetch({
      endpoint: "change-password",
      formData,
      redirectRoute: "/",
      options,
    });

    finishLoading();
  };

  return (
    <Form
      title="Cambia tu contraseña"
      onSubmit={forgetPassword}
      description="Formulario para cambiar tu contraseña"
    >
      <div className="my-[10px] flex flex-col gap-4">
        <Form.Input
          label="Contraseña"
          name="newPassword"
          placeholder="Ingresa tu contraseña nueva..."
          type="password"
        />
        <Form.Input
          label="Confirmar Contraseña"
          name="confirmPassword"
          placeholder="Repite tu contraseña"
          type="password"
        />
      </div>
      <Form.SubmitButton buttonText="Cambiar contraseña" isLoading={isLoading} />
      <Form.Footer description="Volver al inicio" link="/" textLink=" Inicio" />
    </Form>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Cargando formulario...</div>}>
      <ChangePasswordForm />
    </Suspense>
  );
}
