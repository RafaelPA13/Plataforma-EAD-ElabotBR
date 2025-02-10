import StudantNavbar from "../../components/StudantNavbar";
import CourseCard from "../../components/CourseCard";

export default function ClientHomePage() {
  return (
    <div>
      <StudantNavbar />
      <div className="relative top-[110px] p-7 flex flex-col">
        <ul className="flex">
        <CourseCard
          id={1}
          course={"X"}
          mentor={"Y"}
          active={true}
          admin={false}
          progress={10}
        />
        </ul>
      </div>
    </div>
  );
}
