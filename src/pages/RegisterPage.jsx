import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { signUp } = UserAuth();

  const register = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (password == confirmPassword) {
        await signUp(name, email, password);
        navigate("/aluno");
      } else {
        setError("As senhas não são idênticas");
        setPassword("");
        setConfirmPassword("");
        alert(error)
      }
    } catch (err) {
      setError(err.message);
      alert(err.message);
    }
  };

  return (
    <div className="bg-auth flex items-center">
      <form className="form-auth" onSubmit={register}>
        <div className="flex gap-2 lg:gap-5">
          <img
            src="/logo-elaborBr.png"
            alt="ElaborBr"
            className="h-20 w-[124px]"
          />
          <div className="w-[1px] bg-zinc-500"></div>
          <img
            src="/logo-trasicao-trabalhista.png"
            alt="Transição Trabalhista"
            className="h-20"
          />
        </div>
        <div className="w-full flex flex-col items-start gap-3">
          <h1 className="font-bold text-lg">Registrar</h1>
          <h2>Informe seus dados para registro</h2>
        </div>

        <div className="w-full flex flex-col items-end gap-5">
          <input
            type="text"
            placeholder="Nome:"
            className="input"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="Email:"
            className="input"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Senha: (mínimo 6 dígitos)"
            className="input"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Confirmar Senha:"
            className="input"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </div>

        <button className="btn-gradient">Registrar</button>

        <span className="w-full flex gap-2 lg:gap-2">
          <p className="text-sm">Já possui conta?</p>
          <Link to={"/"} className="font-semibold text-primary text-sm">
            Entre
          </Link>
        </span>
      </form>
    </div>
  );
}
