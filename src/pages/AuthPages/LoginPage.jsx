import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

import ToastNotifications from "../../components/ToastNotifications";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const navigate = useNavigate();

  const { signIn } = UserAuth();

  const login = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate("/escolher-rota");
    } catch (error) {
      setToastMessage("Email ou senha inválidos");
      setToastType("danger");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="bg-auth flex items-center">
      {toastMessage && (
        <ToastNotifications
          message={toastMessage}
          success={toastType === "success"}
          warning={toastType === "warning"}
          danger={toastType === "danger"}
        />
      )}

      <div className="w-[50%] hidden lg:block">
        <img
          src="/dark-elaborBr-logo.png"
          alt="logo elaborBr"
          className="w-[75%] mx-auto"
        />
      </div>
      <form className="form-auth" onSubmit={login}>
        <img
          src="/logo-trasicao-trabalhista.png"
          alt="Transição Trabalhista"
          className="w-24 md:w-32 lg:w-48"
        />
        <div className="w-full flex flex-col items-start gap-3">
          <h1 className="font-bold text-lg">Olá seja bem vindo(a)!</h1>
          <h2>Informe seus dados para acessar a plataforma</h2>
        </div>

        <div className="w-full flex flex-col items-end gap-5">
          <input
            type="email"
            placeholder="Email:"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha:"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to={"/recuperar-senha"} className="text-zinc-600 text-sm">
            Esqueci minha senha
          </Link>
        </div>

        <button className="btn-gradient">Entrar</button>

        <span className="w-full flex gap-2 lg:gap-2">
          <p className="text-sm">Não possui conta?</p>
          <Link to={"/registro"} className="font-semibold text-primary text-sm">
            Registre-se
          </Link>
        </span>
      </form>
    </div>
  );
}
