import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { Link } from "react-router-dom";

import CourseGuide from "../../components/CourseCard";
import CreateCourseModal from "../../components/CreateCourseModal";
import EditComapnyModal from "../../components/EditComanyModal";
import { IoIosArrowBack } from "react-icons/io";

export default function CompanyDetailPage() {
  const { companyId } = useParams();
  const [company, setCompany] = useState([]);
  const [courses, setCourses] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalCompany, setOpenModalCompany] = useState(false);

  useEffect(() => {
    const fetchCompany = async () => {
      const docRef = doc(db, "companies", companyId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const companyData = docSnap.data();
        setCompany({ ...companyData, id: docSnap.id });

        const coursesData = [];
        for (const courseId of companyData.coursesId || []) {
          const courseRef = doc(db, "courses", courseId);
          const courseSnap = await getDoc(courseRef);

          if (courseSnap.exists()) {
            coursesData.push({ id: courseSnap.id, ...courseSnap.data() });
          }
        }
        setCourses(coursesData);
      }
    };
    fetchCompany();
  }, [companyId, openModal, openModalCompany]);

  return (
    <div className="w-full flex flex-col">
      <div className="page">
        <Link
          to={"/admin/aulas"}
          className="flex items-center gap-2 text-xl text-primary cursor-pointer font-semibold"
        >
          <IoIosArrowBack />
          Voltar
        </Link>
        <div className="w-full bg-light-green p-7 rounded-2xl flex flex-col justify-between lg:flex-row">
          {/* Quando o storage estiver em uso colocar foto da empresa */}
          <img src="/empresa-desconhecida.svg" alt={company.company} />
          <div className="w-full p-5 flex flex-col gap-3 uppercase lg:w-[50%]">
            <h1 className="text-3xl font-bold">{company.company}</h1>
            <h2 className="text-lg text-zinc-500">{company.code}</h2>
            <button
              className="btn-gradient"
              onClick={() => setOpenModalCompany(true)}
            >
              Editar
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3 items-center justify-between lg md:flex-row">
          <h1 className="w-full text-3xl font-bold">Treinamentos</h1>
          <button className="btn-green" onClick={() => setOpenModal(true)}>
            Adicionar Treinamento
          </button>
        </div>
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {courses.map((course) => (
            <CourseGuide
              key={course.id}
              id={course.id}
              course={course.name}
              mentor={course.mentor}
              active={course.active}
              companyId={companyId}
            />
          ))}
        </ul>
      </div>
      <CreateCourseModal
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
        companyId={companyId}
      />
      <EditComapnyModal
        openModalCompany={openModalCompany}
        closeCompanyModal={() => setOpenModalCompany(false)}
        companyId={companyId}
      />
    </div>
  );
}
