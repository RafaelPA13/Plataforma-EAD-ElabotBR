import { Link } from "react-router-dom";

export default function RecoverPasswordPage() {
  return (
    <div className="bg-auth flex items-center">
      <form className="form-auth">
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
