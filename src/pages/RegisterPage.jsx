import { Link } from "react-router-dom";

export default function RegisterPage() {
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
          <h1 className="font-bold text-lg">Registrar</h1>
          <h2>Informe seus dados para registro</h2>
        </div>

        <div className="w-full flex flex-col items-end gap-5">
          <input type="text" placeholder="Nome:" className="input" />
          <input type="email" placeholder="Email:" className="input" />
          <input
            type="password"
            placeholder="Senha: (mínimo 6 dígitos)"
            className="input"
          />
          <input type="text" placeholder="Confirmar Senha:" className="input" />
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
