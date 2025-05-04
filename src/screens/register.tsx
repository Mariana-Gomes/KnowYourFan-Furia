import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { months } from "../constants";

import { Header } from "../components/Header";
import { FormInput } from "../components/Input";

import { saveUserData } from "../storage/userStorage";
import { registerUser } from "../services/authService";
import { Loading } from "../components/Loading";

const schema = yup.object().shape({
  name: yup.string().required("O nome é obrigatório"),
  email: yup
    .string()
    .required("O e-mail é obrigatório")
    .email("E-mail inválido"),
  password: yup
    .string()
    .required("A senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas não coincidem")
    .required("Confirme a senha"),
  birthDate: yup
    .object({
      day: yup.string().required("Dia obrigatório"),
      month: yup.string().required("Mês obrigatório"),
      year: yup.string().required("Ano obrigatório"),
    })
    .test("is-valid-date", "Data inválida", (value) => {
      const { day, month, year } = value || {};
      if (!day || !month || !year) return false;
      const date = new Date(`${year}-${month}-${day}`);
      return (
        date instanceof Date &&
        !isNaN(date.getTime()) &&
        date.getDate() === Number(day)
      );
    }),
});

export type RegisterFormData = yup.InferType<typeof schema>;

export function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    const { email, password } = data;

    const userCredential = await registerUser(email, password);
    const uid = userCredential.user.uid;

    await saveUserData(uid, data);
    setIsLoading(false);

    navigate("/timeline");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="w-full">
        <Header />
      </div>

      <div className="flex justify-center items-center min-h-[calc(100vh-80px)] my-10 max-sm:p-4">
        <div className="flex flex-col gap-4 max-w-xl w-full p-20 rounded-2xl bg-[#252525] max-sm:p-12">
          <form
            className="flex flex-col gap-4 w-full"
            onSubmit={handleSubmit(handleRegister)}
          >
            <h1 className="text-left font-bold text-3xl text-white">
              Registar-se
            </h1>
            <p className="text-left mb-10 text-base text-white">
              Faça parte da torcida mais feroz do Brasil. Conecte-se com quem
              vive o espírito da{" "}
              <span className="font-bold text-white">FURIA</span>!
            </p>

            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <FormInput
                    {...field}
                    placeholder="Nome"
                    margin
                    error={errors?.name?.message}
                  />
                </>
              )}
            />

            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <FormInput
                    {...field}
                    placeholder="E-mail"
                    margin
                    error={errors?.email?.message}
                  />
                </>
              )}
            />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <FormInput
                    {...field}
                    placeholder="Senha"
                    error={errors?.password?.message}
                    type="password"
                    margin
                  />
                </>
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <>
                  <FormInput
                    {...field}
                    placeholder="Confirmar senha"
                    error={errors?.confirmPassword?.message}
                    type="password"
                    margin
                  />
                </>
              )}
            />

            <Controller
              name="birthDate"
              control={control}
              defaultValue={{ day: "", month: "", year: "" }}
              render={({ field }) => (
                <>
                  <p className="text-white">Data de Nascimento: </p>
                  <div className="flex gap-4">
                    <select
                      className="p-2 rounded -ml-3 text-white outline-none"
                      value={field.value.day}
                      onChange={(e) =>
                        field.onChange({ ...field.value, day: e.target.value })
                      }
                    >
                      <option value="">Dia</option>
                      {Array.from({ length: 31 }, (_, i) => (
                        <option
                          className="text-black"
                          key={i + 1}
                          value={i + 1}
                        >
                          {i + 1}
                        </option>
                      ))}
                    </select>

                    <select
                      className="rounded text-white outline-none"
                      value={field.value.month}
                      onChange={(e) =>
                        field.onChange({
                          ...field.value,
                          month: e.target.value,
                        })
                      }
                    >
                      <option value="" className="text-black">
                        Mês
                      </option>
                      {months.map((month) => (
                        <option
                          key={month.value}
                          value={month.value}
                          className="text-black"
                        >
                          {month.label}
                        </option>
                      ))}
                    </select>

                    <select
                      className="p-2 rounded text-white outline-none"
                      value={field.value.year}
                      onChange={(e) =>
                        field.onChange({ ...field.value, year: e.target.value })
                      }
                    >
                      <option value="" className="text-black">
                        Ano
                      </option>
                      {Array.from({ length: 100 }, (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return (
                          <option
                            className="text-black"
                            key={year}
                            value={year}
                          >
                            {year}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  {errors.birthDate && (
                    <span className="text-red-500 text-sm mb-4">
                      {errors.birthDate.message}
                    </span>
                  )}
                </>
              )}
            />

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600"
            >
              Criar conta
            </button>

            <p className="mt-5 text-center text-white">Já tem uma conta?</p>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="bg-gray-500 text-white p-2 rounded cursor-pointer hover:bg-gray-600"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
