import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

import CourseCard from "../../components/CourseCard";

export default function CompanyCourses() {
  const { companyId } = useParams();
  const [company, setCompany] = useState([]);
  const [courses, setCourses] = useState([]);

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
  }, [companyId]);

  return (
    <div className="client-page">
      <span className="flex items-center justify-center gap-5">
        <img
          src={company.logo === "" ? "/empresa-desconhecida.svg" : company.logo}
          alt={company.company}
          className="w-24"
        />
        <h1 className="text-2xl font-semibold">{company.company}</h1>
      </span>
      <h1 className="title">Treinamentos em andamento</h1>
      <ul className="card-grid">
        <CourseCard
          id={"course.id"}
          course={"course.name"}
          mentor={"course.mentor"}
          active={"course.active"}
          companyId={companyId}
          progress={50}
          admin={false}
        />
        <CourseCard
          id={"course.id"}
          course={"course.name"}
          mentor={"course.mentor"}
          active={"course.active"}
          companyId={companyId}
          progress={50}
          admin={false}
        />
        <CourseCard
          id={"course.id"}
          course={"course.name"}
          mentor={"course.mentor"}
          active={"course.active"}
          companyId={companyId}
          progress={50}
          admin={false}
        />
      </ul>
      <h1 className="title">Treinamentos da {company.company}</h1>
      <ul className="card-grid">
        <CourseCard
          id={"course.id"}
          course={"course.name"}
          mentor={"course.mentor"}
          active={"course.active"}
          companyId={companyId}
          admin={false}
        />
        <CourseCard
          id={"course.id"}
          course={"course.name"}
          mentor={"course.mentor"}
          active={"course.active"}
          companyId={companyId}
          admin={false}
        />
        <CourseCard
          id={"course.id"}
          course={"course.name"}
          mentor={"course.mentor"}
          active={"course.active"}
          companyId={companyId}
          admin={false}
        />
        <CourseCard
          id={"course.id"}
          course={"course.name"}
          mentor={"course.mentor"}
          active={"course.active"}
          companyId={companyId}
          admin={false}
        />
        <CourseCard
          id={"course.id"}
          course={"course.name"}
          mentor={"course.mentor"}
          active={"course.active"}
          companyId={companyId}
          admin={false}
        />
        <CourseCard
          id={"course.id"}
          course={"course.name"}
          mentor={"course.mentor"}
          active={"course.active"}
          companyId={companyId}
          admin={false}
        />
        <CourseCard
          id={"course.id"}
          course={"course.name"}
          mentor={"course.mentor"}
          active={"course.active"}
          companyId={companyId}
          admin={false}
        />
        <CourseCard
          id={"course.id"}
          course={"course.name"}
          mentor={"course.mentor"}
          active={"course.active"}
          companyId={companyId}
          admin={false}
        />
        <CourseCard
          id={"course.id"}
          course={"course.name"}
          mentor={"course.mentor"}
          active={"course.active"}
          companyId={companyId}
          admin={false}
        />
      </ul>
    </div>
  );
}
