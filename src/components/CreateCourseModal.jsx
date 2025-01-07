import { useState } from "react";
import { db } from "../services/firebase";
import { addDoc, collection, updateDoc, doc, arrayUnion } from "firebase/firestore";

import { IoMdClose } from "react-icons/io";
import ToastNotifications from "./ToastNotifications";

export default function CreateCourseModal({
  openModal,
  closeModal,
  companyId,
}) {
  const [course, setCourse] = useState("");
  const [mentor, setMentor] = useState("");
  const [description, setDescription] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const createCourse = async (e) => {
    e.preventDefault();

    if (course === "" || mentor === "" || description === "") {
      setToastMessage("Preencha todos os campos do formulário");
      setToastType("warning");
    } else {
      try {
        const courseRef = await addDoc(collection(db, "courses"), {
          name: course,
          mentor: mentor,
          description: description,
        });

        const companyRef = doc(db, "companies", companyId);
        await updateDoc(companyRef, {
          coursesId: arrayUnion(courseRef.id),
        });

        setToastMessage("Treinamento adicionado com sucesso!");
        setToastType("success");

        setCourse("");
        setDescription("");
        setMentor("");

        setTimeout(() => {
          setToastMessage("");
          setToastType("");
        }, 5000);

      } catch (error) {
        console.error(error)
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
        <form className="modal-form" onSubmit={createCourse}>
          <button className="modal-btn" onClick={closeModal}>
            <IoMdClose />
          </button>
          <h1 className="mt-10 text-xl font-bold">Adicionar um Treinamento</h1>
          <label className="modal-label">Nome:</label>
          <input
            type="text"
            className="input"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />
          <label className="modal-label">Mentor:</label>
          <input
            type="text"
            className="input"
            value={mentor}
            onChange={(e) => setMentor(e.target.value)}
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
