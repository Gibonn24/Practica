import React from "react";
import { useForm } from "react-hook-form";
import { login } from "../api";

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await login(data.email, data.password);
      console.log("Inicio de sesión exitoso", response);
      alert("Inicio de sesión exitoso");
      // Redirigir al usuario a la página de animes o favoritos
      window.location.href = "/animes";
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      alert("Error en el inicio de sesión. Por favor, revisa tus credenciales.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block">Correo Electrónico</label>
          <input
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
          Iniciar Sesión
        </button>
      </form>
      <div className="mt-4 text-center">
        <p>
          ¿No tienes una cuenta?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
