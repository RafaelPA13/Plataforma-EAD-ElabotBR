import { Link } from "react-router-dom";

export default function CourseGuide({ id, course, mentor, active, companyId }) {
  return (
    <li className="bg-light-green p-5 rounded-lg flex flex-col justify-center gap-3">
      <h1 className="text-xl font-bold">{course}</h1>
      <div className="w-full flex justify-between items-center">
        <p className="text-zinc-500 text-sm font-light">Mentor: {mentor}</p>
        <p
          className={`${
            active ? "text-secondary" : "text-primary"
          } text-sm font-semibold`}
        >
          {active ? "Ativo" : "Inativo"}
        </p>
      </div>
      <Link
        to={`/admin/aulas/${companyId}/cursos/${id}`}
        className="btn-gradient"
      >
        Editar
      </Link>
    </li>
  );
}
