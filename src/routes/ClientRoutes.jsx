import StudantNavbar from "../components/StudantNavbar";
import { Outlet } from "react-router-dom";

export default function Student() {
  return (
    <>
      <StudantNavbar />
      <Outlet />
    </>
  );
}
