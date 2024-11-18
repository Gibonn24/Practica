import React from "react";
import { useForm } from "react-hook-form";
import { register as registerUser } from "../api";

interface RegisterFormInputs {
  email: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await registerUser(data);
      console.log("Registro exitoso");
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      // Redirigir al usuario a la página de inicio de sesión
      window.location.href = "/login";
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Error en el registro. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Registro</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block">Correo Electrónico</label>
          <input
            type="email"
            {...register("email", {
              required: "El correo electrónico es requerido",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Correo electrónico no válido",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="correo@ejemplo.com"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block">Contraseña</label>
          <input
            type="password"
            {...register("password", {
              required: "La contraseña es requerida",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="********"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Registrarse
        </button>
      </form>
      <div className="mt-4 text-center">
        <p>
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Inicia sesión aquí
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
