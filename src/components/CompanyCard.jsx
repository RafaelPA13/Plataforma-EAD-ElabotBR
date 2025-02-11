import { Link } from "react-router-dom";

export default function CompanyCard({
  id,
  logo,
  company,
  code,
  active,
  admin,
}) {
  return (
    <Link
      to={admin ? `/admin/aulas/${id}` : `/cliente/aulas/${id}`}
      className="bg-light-green p-5 rounded-lg flex flex-col justify-center gap-3 duration-300 hover:scale-95"
    >
      <img
        src={logo === "" ? "/empresa-desconhecida.svg" : logo}
        alt={`logo da empresa ${company}`}
      />
      <div>
        <h1 className="text-xl">{company}</h1>
        <span className="flex items-center justify-between">
          <p className="text-zinc-500 text-sm font-light">{code}</p>
          <p className={admin ? "text-secondary text-sm" : "hidden"}>
            {active ? "Ativo" : "Inativo"}
          </p>
        </span>
      </div>
    </Link>
  );
}
