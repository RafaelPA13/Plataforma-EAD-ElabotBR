import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { IoMdClose } from "react-icons/io";
import ToastNotifications from "./ToastNotifications";

export default function EditCourseModal({ openModal, closeModal, courseId }) {
  const [course, setCourse] = useState("");
  const [mentor, setMentor] = useState("");
  const [description, setDescription] = useState("");
  const [active, setActive] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const fetchCourseData = async () => {
    if (courseId) {
      const docRef = doc(db, "courses", courseId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setCourse(data.name || "");
        setMentor(data.mentor || "");
        setDescription(data.description || "");
        setActive(data.active !== undefined ? data.active : true);
      }
    }
  };

  useEffect(() => {
    if (openModal) {
      fetchCourseData();
      setToastMessage("");
      setToastType("");
    }
  }, [openModal, courseId]);

  const updateCourse = async (e) => {
    e.preventDefault();

    if (course === "" || mentor === "" || description === "") {
      setToastMessage("Preencha todos os campos do formulário");
      setToastType("warning");
    } else {
      try {
        await updateDoc(doc(db, "courses", courseId), {
          name: course,
          mentor: mentor,
          active: active,
          description: description,
        });

        setToastMessage("Treinamento editado com sucesso!");
        setToastType("success");

        setCourse("");
        setDescription("");
        setMentor("");

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
        <form className="modal-form" onSubmit={updateCourse}>
          <button className="modal-btn" onClick={closeModal}>
            <IoMdClose />
          </button>
          <h1 className="mt-10 text-xl font-bold">Editar um Treinamento</h1>
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
          <span className="w-full flex gap-3 items-center">
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
          <button className="btn-green">Salvar</button>
        </form>
      </div>
    </div>
  );
}
