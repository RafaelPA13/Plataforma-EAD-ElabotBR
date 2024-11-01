import { Link } from "react-router-dom";

export default function LoginPage() {
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
          <h1 className="font-bold text-lg">Olá seja bem vindo(a)!</h1>
          <h2>
            Informe seus dados para acessar a plataforma
          </h2>
        </div>

        <div className="w-full flex flex-col items-end gap-5">
          <input type="text" placeholder="Email:" className="input" />
          <input type="text" placeholder="Senha:" className="input" />
          <Link to={""} className="text-zinc-600 text-sm" >Esqueci minha senha</Link>
        </div>

        <button className="btn">Entrar</button>

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
