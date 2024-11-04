export default function RedefinePasswordPage() {
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
          <h1 className="font-bold text-lg">Informe a sua nova senha</h1>
          <h2>Insira sua nova senha para acessar a plataforma</h2>
        </div>

        <div className="w-full flex flex-col items-end gap-5">
          <input
            type="password"
            placeholder="Senha: (mínimo 6 dígitos)"
            className="input"
          />
          <input
            type="password"
            placeholder="Confirmar Senha:"
            className="input"
          />
        </div>

        <button className="btn-gradient">Redefinir</button>
      </form>
    </div>
  );
}
