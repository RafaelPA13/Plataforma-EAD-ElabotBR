import { useParams } from "react-router-dom";

export default function CourseDetailPage() {
  const { companyId, courseId } = useParams();

  return (
    <div>
      <h1>Detalhes do Curso</h1>
      <p>Empresa ID: {companyId}</p>
      <p>Curso ID: {courseId}</p>
    </div>
  );
}
