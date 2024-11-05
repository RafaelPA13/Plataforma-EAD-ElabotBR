import { Link } from "react-router-dom";

export default function LoginPage() {
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
          <h1 className="font-bold text-lg">Olá seja bem vindo(a)!</h1>
          <h2>Informe seus dados para acessar a plataforma</h2>
        </div>

        <div className="w-full flex flex-col items-end gap-5">
          <input type="email" placeholder="Email:" className="input" />
          <input type="password" placeholder="Senha:" className="input" />
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
