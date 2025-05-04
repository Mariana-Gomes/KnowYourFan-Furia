import "../App.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../components/Header";
import { FormInput } from "../components/Input";
import { Loading } from "../components/Loading";

import { loginUser } from "../services/authService";
import { useAuth } from "../hooks/useAuth";
import { handleAuthError } from "../utils/handleAuthError";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { showToast } = useAuth();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await loginUser(email, password);
      navigate("/timeline");
    } catch (error) {
      const errorMessage = handleAuthError(error);
      showToast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full">
        <Header />
      </div>
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)] my-8 max-md:p-4">
        <div className="flex flex-col gap-4 max-w-xl w-full p-20 rounded-2xl bg-[#252525] max-sm:p-12">
          <form className="flex flex-col gap-4 w-full">
            <h1 className="text-left font-bold text-3xl text-white">Entrar</h1>
            <p className="text-left mb-10 text-base text-white">
              Entre para a rede social da
              <span className="font-bold text-white"> FURIA</span>. Compartilhe,
              interaja e mostre sua paixão pelos panteras 🔥
            </p>
            <FormInput
              name="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin
            />
            <FormInput
              name="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              margin
            />
            <button
              type="button"
              onClick={handleLogin}
              className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-600"
              disabled={isLoading}
            >
              {isLoading ? "Carregando..." : "Entrar"}
            </button>

            <p className="mt-5 text-center text-white">
              Ainda não tem uma conta?
            </p>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 cursor-pointer"
            >
              Criar conta
            </button>
          </form>
        </div>
      </div>
      {isLoading && <Loading />}{" "}
    </>
  );
}
