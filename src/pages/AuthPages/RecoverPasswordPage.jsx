import { Link } from "react-router-dom";

export default function RecoverPasswordPage() {
  return (
    <div className="bg-auth flex items-center">
      <div className="w-[50%] hidden lg:block">
        <img
          src="/dark-elaborBr-logo.png"
          alt="logo elaborBr"
          className="w-[75%] mx-auto"
        />
      </div>
      <form className="form-auth">
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

        <input type="email" placeholder="Email:" className="input" />
        <button className="btn-gradient">Enviar</button>
        <Link
          to={"/"}
          className="w-full border-2 border-primary font-semibold text-primary text-center p-2 rounded-lg duration-300 md:p-4 hover:bg-primary hover:text-light"
        >
          Voltar
        </Link>
      </form>
    </div>
  );
}
