import { IoTimeOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";

import Modules from "../../components/Modules";
import EditCourseModal from "../../components/EditCourseModal";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

export default function CourseDetailPage() {
  const [course, setCourse] = useState([]);
  const [openModalCourse, setOpenModalCourse] = useState(false);
  const { companyId, courseId } = useParams();

  // useEffect(() => {
  //   const fetchCompany = async () => {
  //     const docRef = doc(db, "companies", companyId);
  //     const docSnap = await getDoc(docRef);

  //     if (docSnap.exists()) {
  //       const companyData = docSnap.data();
  //       setCompany({ ...companyData, id: docSnap.id });

  //       const coursesData = [];
  //       for (const courseId of companyData.coursesId || []) {
  //         const courseRef = doc(db, "courses", courseId);
  //         const courseSnap = await getDoc(courseRef);

  //         if (courseSnap.exists()) {
  //           coursesData.push({ id: courseSnap.id, ...courseSnap.data() });
  //         }
  //       }
  //       setCourses(coursesData);
  //     }
  //   };
  //   fetchCompany();
  // }, [companyId, openModal, openModalCompany]);

  useEffect(() => {
    const fetchCourseData = async () => {
      const docRef = doc(db, "courses", courseId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const courseData = docSnap.data();
        setCourse({ ...courseData, id: docSnap.id });
      }
    };
    fetchCourseData();
  }, [courseId, openModalCourse]);

  return (
    <div className="w-full">
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
            <h1 className="text-3xl font-bold">{course.name}</h1>
            <span className="flex flex-wrap gap-5">
              <h2 className="text-lg text-zinc-600">Mentor: {course.mentor}</h2>
              <h2 className="flex items-center gap-2 text-primary">
                <IoTimeOutline />
                02:00
              </h2>
              <h2 className="flex items-center gap-2 text-secondary">
                <FaStar />5
              </h2>
              <h2 className="font-semibold text-tertiary">
                {course.active ? "Ativo" : "Inativo"}
              </h2>
            </span>
            <p>{course.description}</p>
            <button
              className="btn-gradient"
              onClick={() => setOpenModalCourse(true)}
            >
              Editar
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3 items-center justify-between lg md:flex-row">
          <h1 className="w-full text-2xl font-bold">Módulos</h1>
          <button className="btn-green">Adicionar Módulo</button>
        </div>
        <ul className="flex flex-col gap-5">
          <Modules admin={true} />
        </ul>
      </div>
      <EditCourseModal
        openModal={openModalCourse}
        closeModal={() => setOpenModalCourse(false)}
        courseId={courseId}
      />
    </div>
  );
}
