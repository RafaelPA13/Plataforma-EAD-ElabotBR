import ToastNotifications from "./ToastNotifications";

import { IoMdClose } from "react-icons/io";

import { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  updateDoc,
  doc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../services/firebase";

export default function CreateModuleModal({ openModal, closeModal, courseId }) {
  const [name, setName] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  useEffect(() => {
    if (openModal) {
      setToastMessage("");
      setToastType("");
    }
  }, [openModal]);

  const createModule = async (e) => {
    e.preventDefault();
    if (name === "") {
      setToastMessage("Insira o nome do módulo");
      setToastType("warning");
    } else {
      try {
        const moduleRef = await addDoc(collection(db, "modules"), {
          name: name,
          active: true,
          classesId: [],
        });

        await updateDoc(doc(db, "courses", courseId), {
          modulesId: arrayUnion(moduleRef.id),
        });

        setToastMessage("Módulo adicionado com sucesso!");
        setToastType("success");

        setName("");

        setTimeout(() => {
          setToastMessage("");
          setToastType("");
        }, 5000);
      } catch (error) {
        console.error(error);
        setToastMessage(error.message);
        setToastType("danger");
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
        <form className="modal-form" onSubmit={createModule}>
          <button className="modal-btn" onClick={closeModal}>
            <IoMdClose />
          </button>
          <h1 className="mt-10 text-xl font-bold">Adicionar Módulo</h1>
          <label className="modal-label">Nome:</label>
          <input
            type="text"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="btn-green">Salvar</button>
        </form>
      </div>
    </div>
  );
}
