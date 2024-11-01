import { Link } from "react-router-dom";

export default function RedefinePasswordPage() {
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
          <h1 className="font-bold text-lg">Informe a sua nova senha</h1>
          <h2>Insira sua nova senha para acessar a plataforma</h2>
        </div>

        <div className="w-full flex flex-col items-end gap-5">
          <input type="password" placeholder="Senha: (mínimo 6 dígitos)" className="input" />
          <input type="password" placeholder="Confirmar Senha:" className="input" />
        </div>

        <button className="btn-gradient">Redefinir</button>


      </form>
    </div>
  );
}
