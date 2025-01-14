import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../services/firebase";

import { IoMdClose } from "react-icons/io";
import ToastNotifications from "./ToastNotifications";

export default function EditComapnyModal({
  openModalCompany,
  closeCompanyModal,
  companyId,
}) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const fetchCompanyData = async () => {
    if (companyId) {
      const docRef = doc(db, "companies", companyId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setName(data.company || "");
        setCode(data.code || "");
      }
    }
  };

  const updateCompany = async (e) => {
    e.preventDefault();
    try {
      if (name === "" || code === "") {
        setToastMessage("Preencha todos os campos do formulário");
        setToastType("warning");
      } else {
        await updateDoc(doc(db, "companies", companyId), {
          company: name,
          code: code,
        });

        setToastMessage("Dados da empresa alterados com sucesso");
        setToastType("success");
      }
      setTimeout(() => {
        setToastMessage("");
        setToastType("");
      }, 5000);
    } catch (error) {
      console.error(error);
      setToastMessage(error.message);
      setToastType("danger");
    }
  };

  useEffect(() => {
    if (openModalCompany) {
      fetchCompanyData();
      setToastMessage("");
      setToastType("");
    }
  }, [openModalCompany, companyId]);

  if (!openModalCompany) return null;

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
        <form className="modal-form" onSubmit={updateCompany}>
          <button className="modal-btn" onClick={closeCompanyModal}>
            <IoMdClose />
          </button>
          {/* Quando o storage estiver em uso colocar foto da empresa */}
          <img
            src="/empresa-desconhecida.svg"
            alt="empresa"
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
          <label className="modal-label">CPF/CNPJ:</label>
          <input
            type="text"
            className="input"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button className="btn-green">Salvar</button>
        </form>
      </div>
    </div>
  );
}
