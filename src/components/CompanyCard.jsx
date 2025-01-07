import { Link } from "react-router-dom";

export default function CompanyCard({ id, logo, company, code }) {
  return (
    <Link to={`/admin/aulas/${id}`} className="bg-light-green p-5 rounded-lg flex flex-col justify-center gap-3 duration-300 hover:scale-95">
      <img
        src={logo === "" ? "/empresa-desconhecida.svg" : logo}
        alt={`logo da empresa ${company}`}
      />
      <div>
        <h1 className="text-xl">{company}</h1>
        <p className="text-zinc-500 text-sm font-light">{code}</p>
      </div>
    </Link>
  );
}
