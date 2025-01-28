import ToastNotifications from "./ToastNotifications";
import { IoMdClose } from "react-icons/io";

import { useEffect, useState } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";

export default function EditClassModal({ openModal, closeModal, classId }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [active, setActive] = useState(true);
  const [description, setDescription] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const fetchClassesData = async () => {
    if (classId) {
      const docSnap = await getDoc(doc(db, "classes", classId));

      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.name || "");
        setLink(data.link || "");
        setActive(data.active !== undefined ? data.active : true);
        setDescription(data.description || "");
      }
    }
  };

  useEffect(() => {
    if (openModal) {
      setToastMessage("");
      setToastType("");
      fetchClassesData();
    }
  }, [openModal, classId]);

  const updataClass = async (e) => {
    e.preventDefault();
    if (name === "" || link === "") {
      setToastMessage("Preencha todos os campos do formulário");
      setToastType("warning");
    } else if (!link.includes("https://")) {
      setToastMessage("Insira um link válido");
      setToastType("warning");
    } else {
      try {
        await updateDoc(doc(db, "classes", classId), {
          name: name,
          link: link,
          active: active,
          description: description,
        });

        setToastMessage("Aula editada com sucesso");
        setToastType("success");

        setName("");
        setLink("");
        setDescription("");

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
        <form className="modal-form" onSubmit={updataClass}>
          <button className="modal-btn" onClick={closeModal}>
            <IoMdClose />
          </button>
          <h1 className="mt-10 text-xl font-bold">Editar Aula</h1>
          <label className="modal-label">Nome:</label>
          <input
            type="text"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="modal-label">Link:</label>
          <input
            type="text"
            className="input"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <span className="w-full flex items-center gap-3">
            <label className="modal-label">Ativo:</label>
            <input
              type="checkbox"
              className="modal-checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
          </span>
          <label className="modal-label">Descrição:</label>
          <textarea
            className="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button className="btn-green">
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
