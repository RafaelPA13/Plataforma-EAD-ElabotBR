import ToastNotifications from "./ToastNotifications";
import { IoMdClose } from "react-icons/io";

import { useState } from "react";

export default function ConfirmModal({
  message,
  openModal,
  closeModal,
  deleteFunc,
}) {
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

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
        <div className="modal-form">
          <h1 className="text-center text-lg">{message}</h1>
          <span className="w-full flex gap-10">
            <button className="btn-green" onClick={deleteFunc}>
              Sim
            </button>
            <button className="btn-red" onClick={closeModal}>
              Não
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
