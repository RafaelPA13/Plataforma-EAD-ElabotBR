import ToastNotifications from "./ToastNotifications";
import MaterialLinks from "./MaterialLinks";
import { IoMdClose } from "react-icons/io";

import { useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../services/firebase";

export default function AddMaterialsModal({ openModal, closeModal, classId }) {
  const [nameLink, setNameLink] = useState("");
  const [urlLink, setUrlLink] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const createMaterial = async (e) => {
    e.preventDefault();
    if (nameLink === "" || urlLink === "") {
      setToastMessage("Preencha todos os campos do formulário");
      setToastType("warning");
    } else if (!link.includes("https://")) {
      setToastMessage("Insira um link válido");
      setToastType("warning");
    } else {
      try {
      } catch (error) {
        console.error(error);
        setToastMessage(error.message);
        setToastType("warning");
      }
    }
  };

  if (!openModal) return null;
  return (
    <div className="modal-index">
      <div className="modal-bg">
        {toastMessage && (
          <ToastNotifications
            message={toastMessage}
            success={toastType === "success"}
            warning={toastType === "warning"}
            danger={toastType === "danger"}
          />
        )}
        <form className="modal-form">
          <button className="modal-btn" onClick={closeModal}>
            <IoMdClose />
          </button>
          <h1 className="mt-10 text-xl font-bold">Adicionar Materiais</h1>
          <label className="modal-label">Nome:</label>
          <input
            type="text"
            className="input"
            value={nameLink}
            onChange={(e) => setNameLink(e.target.value)}
          />
          <label className="modal-label">Link:</label>
          <input
            type="text"
            className="input"
            value={urlLink}
            onChange={(e) => setUrlLink(e.target.value)}
          />
          <button className="btn-green">Salvar</button>
          <h2 className="w-full text-lg font-semibold">Lista de Materiais</h2>
          <ul className="w-full max-h-[160px] flex flex-col gap-2 overflow-y-auto">
            <MaterialLinks
              name={"Teste"}
              url={"https://github.com/RafaelPA13"}
            />
          </ul>
        </form>
      </div>
    </div>
  );
}
