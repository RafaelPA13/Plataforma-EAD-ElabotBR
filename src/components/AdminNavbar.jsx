import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

import { IoIosArrowBack } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { FaBuilding } from "react-icons/fa";
import { MdClass } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { MdSell } from "react-icons/md";
import { TfiStatsUp } from "react-icons/tfi";

export default function AdminSidebar() {
  const [open, setOpen] = useState(true);

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
    <header className={`${open ? "w-72" : "w-28"} h-screen bg-light-green p-5 relative flex flex-col justify-between duration-500`}>
      <button
        className={`absolute rounded-full -right-3 top-9 p-2 border-2 border-primary bg-light text-secondary duration-500 ${
          !open && "rotate-180"
        }`}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <IoIosArrowBack />
      </button>

      <nav>
        <div className="flex justify-center ">
          <img
            src={open ? "/logo-elaborBR.svg" : "/logo-elaborBR-menor.svg"}
            alt="logo elaborBR"
            className={open ? "w-44" : "w-10"}
          />
        </div>
        <ul className="mt-5">
          <Link
            className={`flex items-center ${
              open ? "gap-3" : "justify-center"
            } font-semibold text-2xl text-zinc-500 p-3 rounded-md hover:bg-green-100 hover:text-primary`}
          >
            <MdDashboard />
            <span className={open ? "block" : "hidden"}>Dashboard</span>
          </Link>
          <Link
            className={`flex items-center ${
              open ? "gap-3" : "justify-center"
            } font-semibold text-2xl text-zinc-500 p-3 rounded-md hover:bg-green-100 hover:text-primary`}
          >
            <FaBuilding />
            <span className={open ? "block" : "hidden"}>Empresas</span>
          </Link>
          <Link
            className={`flex items-center ${
              open ? "gap-3" : "justify-center"
            } font-semibold text-2xl text-zinc-500 p-3 rounded-md hover:bg-green-100 hover:text-primary`}
          >
            <MdClass />
            <span className={open ? "block" : "hidden"}>Aulas</span>
          </Link>
          <Link
            className={`flex items-center ${
              open ? "gap-3" : "justify-center"
            } font-semibold text-2xl text-zinc-500 p-3 rounded-md hover:bg-green-100 hover:text-primary`}
          >
            <FaUsers />
            <span className={open ? "block" : "hidden"}>Usuários</span>
          </Link>
          <Link
            className={`flex items-center ${
              open ? "gap-3" : "justify-center"
            } font-semibold text-2xl text-zinc-500 p-3 rounded-md hover:bg-green-100 hover:text-primary`}
          >
            <MdSell />
            <span className={open ? "block" : "hidden"}>Vendas</span>
          </Link>
          <Link
            className={`flex items-center ${
              open ? "gap-3" : "justify-center"
            } font-semibold text-2xl text-zinc-500 p-3 rounded-md hover:bg-green-100 hover:text-primary`}
          >
            <TfiStatsUp />
            <span className={open ? "block" : "hidden"}>Métricas</span>
          </Link>
        </ul>
      </nav>
      <div className="pt-5 border-t-2 border-secondary">
        <span
          className={`flex items-center ${open ? "gap-3" : "justify-center"}`}
        >
          <img
            src="/perfil-desconhecido.svg"
            alt="perfil"
            className="size-12"
          />
          <div className={open ? "block" : "hidden"}>
            <h1 className="font-semibold text-xl">{user.displayName}</h1>
            <h2 className="font-light text-zinc-500 text-sm">{user.email}</h2>
          </div>
        </span>
        <button className="btn-red mt-5" onClick={exit}>Sair</button>
      </div>
    </header>
  );
}