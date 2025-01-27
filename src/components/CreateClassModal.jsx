import { IoMdClose } from "react-icons/io";
import ToastNotifications from "./ToastNotifications";

import { useState, useEffect } from "react";
import {
  addDoc,
  updateDoc,
  collection,
  doc,
  getDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../services/firebase";

export default function CreateClassModal({ openModal, closeModal, moduleId }) {
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (openModal) {
      setToastMessage("");
      setToastType("");
    }
  }, [openModal]);

  const createClass = async (e) => {
    e.preventDefault();
    if (name === "" || link === "") {
      setToastMessage("Preencha todos os campos do formulário");
      setToastType("warning");
    } else if (!link.includes("https://")) {
      setToastMessage("Insira um link válido");
      setToastType("warning");
    } else {
      try {
        const moduleRef = doc(db, "modules", moduleId);
        const moduleSnap = await getDoc(moduleRef);

        let nextIndex = 1;
        if (moduleSnap.exists()) {
          const moduleData = moduleSnap.data();
          const classesId = moduleData.classesId || [];

          if (classesId.length > 0) {
            const classesData = [];
            for (const classId of classesId) {
              const classSnap = await getDoc(doc(db, "classes", classId));

              if (classSnap.exists()) {
                classesData.push(classSnap.data());
              }
            }
            classesData.sort((a, b) => a.index - b.index);
            nextIndex = parseInt(classesData[classesData.length - 1].index) + 1;
          }
        }

        const classRef = await addDoc(collection(db, "classes"), {
          name: name,
          link: link,
          description: description,
          index: nextIndex,
          active: true,
          materials: [],
        });

        await updateDoc(moduleRef, {
          classesId: arrayUnion(classRef.id),
        });

        setToastMessage("Treinamento adicionado com sucesso!");
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
        <form className="modal-form" onSubmit={createClass}>
          <button className="modal-btn" onClick={closeModal}>
            <IoMdClose />
          </button>
          <h1 className="mt-10 text-xl font-bold">Adicione um treinamento</h1>
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
          <label className="modal-label">Descrição:</label>
          <textarea
            className="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button className="btn-green">Salvar</button>
        </form>
      </div>
    </div>
  );
}
