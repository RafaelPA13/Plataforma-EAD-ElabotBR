import { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

import { IoMdClose } from "react-icons/io";
import ToastNotifications from "./ToastNotifications";

export default function EditProfileModal({ openModal, closeModal }) {
  const { user, editProfile } = UserAuth();

  const [userData, setUserData] = useState([]);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  useEffect(() => {
    if (user?.uid) {
      const q = query(collection(db, "users"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.id === user.uid) {
            const data = doc.data();
            setUserData(data);
          }
        });
      });
      return () => unsubscribe();
    }
  }, [user]);

  useEffect(() => {
    if (openModal && userData) {
      setName(userData.name || user.displayName || "");
      setBio(userData.bio || "");
    }
  }, [openModal, userData, user]);

  const profileEdit = async (e) => {
    e.preventDefault();
    try {
      if (name.trim() === "") {
        setToastMessage("Insira o seu nome");
        setToastType("warning");
        return;
      }
      await editProfile(user, name, bio);
      setToastMessage("Perfil alterado com sucesso!");
      setToastType("success");
    } catch (error) {
      setToastMessage(error.message);
      setToastType("danger");
    }
    
  };

  const handleCloseModal = () => {
    setToastMessage("");
    setToastType("");
    closeModal();
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
        <form className="modal-form" onSubmit={profileEdit}>
          <button className="modal-btn" onClick={handleCloseModal}>
            <IoMdClose />
          </button>
          <img
            src={
              user.photoURL == null ? "/perfil-desconhecido.svg" : user.photoURL
            }
            alt="perfil"
            className="size-32"
          />
          <input type="file" className="input" />
          <label className="modal-label">Nome:</label>
          <input
            type="text"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="modal-label">Biografia:</label>
          <textarea
            className="textarea"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
          <button className="btn-green">Salvar</button>
        </form>
      </div>
    </div>
  );
}
