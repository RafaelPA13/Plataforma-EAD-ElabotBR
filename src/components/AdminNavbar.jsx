import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

import { IoIosArrowBack } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { MdClass } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { MdSell } from "react-icons/md";
import { TfiStatsUp } from "react-icons/tfi";

import AdminNavbarLinks from "./AdminNavbarLinks";
import EditProfileModal from "./EditProfileModal";

export default function AdminSidebar() {
  const [open, setOpen] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const navLinks = [
    { icon: <MdDashboard />, text: "Dashboard", route: "/admin" },
    { icon: <FaBuilding />, text: "Empresas", route: "" },
    { icon: <MdClass />, text: "Aulas", route: "" },
    { icon: <FaUsers />, text: "Usuários", route: "" },
    { icon: <MdSell />, text: "Vendas", route: "" },
    { icon: <TfiStatsUp />, text: "Métricas", route: "" },
  ];

  const { user, logOut } = UserAuth();

  const navigate = useNavigate();

  const exit = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <header
        className={`${
          open ? "w-full md:w-72" : "w-28"
        } h-20 p-0 flex flex-row relative duration-500 z-10 md:h-screen flex-col justify-between md:bg-light-green md:p-5`}
      >
        <button
          className={`hidden md:block w-9 p-2 border-2 border-primary bg-light text-secondary duration-500 ${
            !open && "rotate-180"
          } absolute rounded-full -right-4 top-9`}
          onClick={() => setOpen(!open)}
        >
          <IoIosArrowBack />
        </button>

        <nav
          className={`${
            open ? "block" : "hidden"
          } md:block fixed bottom-0 left-0 w-full p-2 bg-light-green md:relative md:bottom-auto md:left-auto`}
        >
          <div className="hidden md:flex justify-center ">
            <img
              src={open ? "/logo-elaborBR.svg" : "/logo-elaborBR-menor.svg"}
              alt="logo elaborBR"
              className={open ? "w-44" : "w-10"}
            />
          </div>
          <ul className="flex flex-row md:flex-col justify-between md:mt-5">
            {navLinks.map((link) => (
              <AdminNavbarLinks
                open={open}
                icon={link.icon}
                text={link.text}
                route={link.route}
              />
            ))}
          </ul>
        </nav>
        <div className="bg-light-green w-full p-2 flex flex-row items-center border-t-0 border-b-2 border-secondary md:flex-col gap-2 md:p-0 md:border-t-2 md:border-b-0 fixed top-0 left-0 z-10 md:relative">
          <span
            className={`w-full flex items-center ${
              open ? "gap-3" : "justify-center"
            } p-2 duration-300 hover:bg-zinc-300 cursor-pointer rounded-lg`}
            onClick={() => setOpenModal(true)}
          >
            <img
              src={
                user.photoURL == null
                  ? "/perfil-desconhecido.svg"
                  : user.photoURL
              }
              alt="perfil"
              className="size-12"
            />
            <div className={`hidden md:${open ? "block" : "hidden"}`}>
              <h1 className="font-semibold text-lg">{user.displayName}</h1>
              <h2 className="font-light text-zinc-500 text-xs">{user.email}</h2>
            </div>
          </span>
          <button className="btn-red" onClick={exit}>
            Sair
          </button>
        </div>
      </header>
      <EditProfileModal
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
      />
    </>
  );
}
