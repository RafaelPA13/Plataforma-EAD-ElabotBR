import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

export default function RedefinePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { resetPassword } = UserAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const oobCode = queryParams.get("oobCode");

  const redefinePassword = async (e) => {
    e.preventDefault();

    if (!oobCode) {
      alert("Código de redefinição inválido ou expirado.");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não são idênticas.");
      setPassword("")
      setConfirmPassword("")
      return;
    }

    try {
      await resetPassword(oobCode, password);
      navigate("/");
    } catch (error) {
      console.error("Erro ao redefinir senha: ", error);
    }
  };

  return (
    <div className="bg-auth flex items-center">
      <div className="w-[50%] hidden lg:block">
        <img
          src="/dark-elaborBr-logo.png"
          alt="logo elaborBr"
          className="w-[75%] mx-auto"
        />
      </div>
      <form className="form-auth" onSubmit={redefinePassword}>
        <img
          src="/logo-trasicao-trabalhista.png"
          alt="Transição Trabalhista"
          className="w-24 md:w-32 lg:w-48"
        />
        <div className="w-full flex flex-col items-start gap-3">
          <h1 className="font-bold text-lg">Informe a sua nova senha</h1>
          <h2>Insira sua nova senha para acessar a plataforma</h2>
        </div>

        <div className="w-full flex flex-col items-end gap-5">
          <input
            type="password"
            placeholder="Senha: (mínimo 6 dígitos)"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirmar Senha:"
            className="input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button className="btn-gradient">Redefinir</button>
      </form>
    </div>
  );
}
