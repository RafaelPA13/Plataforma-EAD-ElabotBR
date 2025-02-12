import { Link } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";

import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useState } from "react";

export default function StudantNavbar() {
  const [openModal, setOpenModal] = useState(false);

  const { user, logOut } = UserAuth();

  const navigate = useNavigate();

  const exit = async () => {
    try {
      await logOut();
      navigate("/");
      alert("Você saiu");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <header className="w-full z-30 fixed bg-light shadow-lg shadow-zinc-300 p-5 flex items-center justify-between font-poppins">
        <Link to={"/cliente"}>
          <img src="/logo-elaborBR.svg" alt="ElaborBr" className="w-24 duration-300 hover:scale-110" />
        </Link>
        <div className="w-[50%] flex justify-between lg:w-[25%]">
          <span
            className="p-2 flex items-center gap-3 hover:bg-zinc-300 cursor-pointer rounded-lg"
            onClick={() => setOpenModal(true)}
          >
            <img
              src={
                user.photoURL == null
                  ? "/perfil-desconhecido.svg"
                  : user.photoURL
              }
              alt="foto de perfil"
              className="w-12"
            />
            <div className="hidden md:block">
              <h1 className="font-semibold text-sm">{user.displayName}</h1>
              <p className="font-light text-zinc-500 text-xs">{user.email}</p>
            </div>
          </span>
          <button
            className="bg-primary text-light text-center py-2 px-5 rounded-lg border-2 border-primary duration-300 hover:bg-transparent hover:text-primary"
            onClick={exit}
          >
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
