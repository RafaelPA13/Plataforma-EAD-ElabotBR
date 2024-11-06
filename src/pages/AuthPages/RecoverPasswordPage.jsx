import { useState } from "react";
import { Link } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

export default function RecoverPasswordPage() {
  const [email, setEmail] = useState("");

  const { sendResetEmail } = UserAuth();

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      await sendResetEmail(email);
      setEmail("");
      alert("Email enviado com sucesso");
    } catch (error) {
      alert(error.message);
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
      <form className="form-auth" onSubmit={sendEmail}>
        <img
          src="/logo-trasicao-trabalhista.png"
          alt="Transição Trabalhista"
          className="w-24 md:w-32 lg:w-48"
        />
        <div className="w-full flex flex-col items-start gap-3">
          <h1 className="font-bold text-lg">Recuperar</h1>
          <h2>
            Informe seu email para receber as instruções de como redefinir sua
            senha
          </h2>
        </div>

        <input
          type="email"
          placeholder="Email:"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="btn-gradient">Enviar</button>
        <Link to={"/"} className="btn-red">
          Voltar
        </Link>
      </form>
    </div>
  );
}
