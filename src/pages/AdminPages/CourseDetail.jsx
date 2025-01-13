import { IoTimeOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";

import Modules from "../../components/Modules";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function CourseDetailPage() {
  const { companyId, courseId } = useParams();

  return (
    <div className="page">
      <Link
        to={`/admin/aulas/${companyId}`}
        className="flex items-center gap-2 text-xl text-primary cursor-pointer font-semibold"
      >
        <IoIosArrowBack />
        Voltar
      </Link>
      <div className="w-full bg-light-green p-7 rounded-xl">
        <div className="w-full flex flex-col gap-3 lg:w-[50%]">
          <h1 className="text-3xl font-bold">Curso</h1>
          <span className="flex flex-wrap gap-5">
            <h2 className="text-lg text-zinc-600">Mentor: Rafael</h2>
            <h2 className="flex items-center gap-2 text-primary">
              <IoTimeOutline />
              02:00
            </h2>
            <h2 className="flex items-center gap-2 text-secondary">
              <FaStar />5
            </h2>
            <h2 className="font-semibold text-tertiary">Ativo</h2>
          </span>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quos
            vitae eligendi architecto, reprehenderit porro dicta laboriosam
            dolorem, repudiandae illum natus eaque eum quas excepturi unde
            nesciunt, blanditiis ea. Voluptas!
          </p>
          <button className="btn-gradient">Editar</button>
        </div>
      </div>
      <div className="flex flex-col gap-3 items-center justify-between lg md:flex-row">
        <h1 className="w-full text-2xl font-bold">Módulos</h1>
        <button className="btn-green">Adicionar Módulo</button>
      </div>
      <ul className="flex flex-col gap-5">
        <Modules admin={true}/>
        <Modules admin={false}/>
      </ul>
    </div>
  );
}
