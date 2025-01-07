import { Link } from "react-router-dom";

export default function CourseGuide({ id, course, mentor, active, companyId }) {
  return (
    <li
      className={
        active
          ? "bg-light-green p-5 rounded-lg flex flex-col justify-center gap-3"
          : "hidden"
      }
    >
      <h1 className="text-xl font-bold">{course}</h1>
      <p className="text-zinc-500 text-sm font-light">Mentor: {mentor}</p>
      <Link to={`/admin/aulas/${companyId}/cursos/${id}`} className="btn-gradient">
        Editar
      </Link>
    </li>
  );
}
