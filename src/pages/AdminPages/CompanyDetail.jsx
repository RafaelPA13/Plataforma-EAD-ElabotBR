import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../services/firebase";

import CourseGuide from "../../components/CourseCard";
import CreateCourseModal from "../../components/CreateCourseModal";

export default function CompanyDetailPage() {
  const { companyId } = useParams();
  const [company, setCompany] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "companies"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.id === companyId) {
          setCompany({ ...doc.data(), id: doc.id });
        }
      });
    });
    return () => {
      unsubscribe();
    };
  }, [company]);

  return (
    <div className="w-full flex flex-col">
      <div className="page">
        <div className="w-full bg-light-green p-7 rounded-2xl flex flex-col justify-between lg:flex-row">
          {/* Quando o storage estiver em uso colocar foto da empresa */}
          <img src="/empresa-desconhecida.svg" alt={company.company} />
          <div className="w-full p-5 flex flex-col gap-3 uppercase lg:w-[50%]">
            <h1 className="text-3xl font-bold">{company.company}</h1>
            <h2 className="text-lg text-zinc-500">{company.code}</h2>
            <button className="btn-gradient">Editar</button>
          </div>
        </div>
        <div className="flex flex-col gap-3 items-center justify-between lg md:flex-row">
          <h1 className="w-full text-3xl font-bold">Treinamentos</h1>
          <button className="btn-green" onClick={()=>setOpenModal(true)}>Adicionar Treinamento</button>
        </div>
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {/* Aqui tera um map de todos os cursos que estão presentes no campo coursesId */}
          <CourseGuide
            id={1}
            course={"Curso"}
            mentor={"Mentor"}
            active={true}
            companyId={companyId}
          />
        </ul>
      </div>
      <CreateCourseModal
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
        companyId={companyId}
      />
    </div>
  );
}
