import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { IoTimeOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import Modules from "../../components/Modules";

export default function CoursesPage() {
  const [course, setCourse] = useState([]);
  const [modules, setModules] = useState([]);
  const { companyId, courseId } = useParams();

  useEffect(() => {
    const fetchCourseData = async () => {
      const docRef = doc(db, "courses", courseId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const courseData = docSnap.data();
        setCourse({ ...courseData, id: docSnap.id });

        const modulesData = [];
        for (const moduleId of courseData.modulesId || []) {
          const moduleRef = doc(db, "modules", moduleId);
          const moduleSnap = await getDoc(moduleRef);

          if (moduleSnap.exists()) {
            modulesData.push({ id: moduleSnap.id, ...moduleSnap.data() });
          }
        }
        modulesData.sort((a, b) => a.index - b.index);
        setModules(modulesData);
      }
    };
    fetchCourseData();
  }, [courseId]);
  return (
    <div className="client-page">
      <Link
        to={`/cliente/aulas/${companyId}`}
        className="flex items-center gap-2 text-xl text-primary cursor-pointer font-semibold"
      >
        <IoIosArrowBack />
        Voltar
      </Link>
      <div className="w-full bg-light-green p-7 rounded-xl flex flex-wrap items-center justify-between">
        <div className="w-full flex flex-col gap-3 lg:w-[50%]">
          <h1 className="text-3xl font-bold">{course.name}</h1>
          <span className="flex flex-wrap gap-5">
            <h2 className="text-lg text-zinc-600">Mentor: {course.mentor}</h2>
            <h2 className="flex items-center gap-2 text-primary">
              <IoTimeOutline />
              02:00
              {/* Definir tempo do curso somando o tempo de todas as aulas */}
            </h2>
            <h2 className="flex items-center gap-2 text-secondary">
              <FaStar />5
              {/* Definir avaliação do curso de acordo com a média dos usuários */}
            </h2>
          </span>
          <p>{course.description}</p>
        </div>
        <div className="w-full flex justify-center lg:w-[50%]">
          <h1 className="bg-light size-32 text-3xl flex items-center justify-center rounded-full border-8 border-secondary">
            50%
            {/* Isso será uma barra de progresso no futuro */}
          </h1>
        </div>
      </div>
      <h1 className="title">Aulas</h1>
              <ul className="flex flex-col gap-5">
                {modules.map((module) => (
                  <Modules
                    key={module.id}
                    moduleId={module.id}
                    admin={false}
                    module={module.name}
                    active={module.active}
                    index={module.index}
                    courseId={courseId}
                    companyId={companyId}
                  />
                ))}
              </ul>
    </div>
  );
}
