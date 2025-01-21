import { IoMdClose } from "react-icons/io";
import ToastNotifications from "./ToastNotifications";

import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";

export default function EditModuleModal({ openModal, closeModal, moduleId }) {
  const [name, setName] = useState("");
  const [active, setActive] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const fetchModuleData = async () => {
    if (moduleId) {
      const docRef = doc(db, "modules", moduleId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name || "");
        setActive(data.active !== undefined ? data.active : true);
      }
    }
  };

  useEffect(() => {
    if (openModal) {
      setToastMessage("");
      setToastType("");
      fetchModuleData();
    }
  }, [openModal, moduleId]);

  const updateModule = async (e) => {
    e.preventDefault();
    if (name === "") {
      setToastMessage("Insira o nome do módulo");
      setToastType("warning");
    } else {
      try {
        await updateDoc(doc(db, "modules", moduleId), {
          name: name,
          active: active,
        });

        setToastMessage("Módulo editado com sucesso!");
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
        <form className="modal-form" onSubmit={updateModule}>
          <button className="modal-btn" onClick={closeModal}>
            <IoMdClose />
          </button>
          <h1 className="mt-10 text-xl font-bold">Editar Módulo</h1>
          <label className="modal-label">Nome:</label>
          <input
            type="text"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span className="w-full flex gap-3 items-center">
            <label className="modal-label">Ativo:</label>
            <input
              type="checkbox"
              className="modal-checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
          </span>
          <button className="btn-green">Salvar</button>
        </form>
      </div>
    </div>
  );
}
