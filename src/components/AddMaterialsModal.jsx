import ToastNotifications from "./ToastNotifications";
import MaterialLinks from "./MaterialLinks";
import { IoMdClose } from "react-icons/io";

import { useEffect, useState } from "react";
import {
  doc,
  addDoc,
  collection,
  updateDoc,
  arrayUnion,
  getDoc,
  deleteDoc,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../services/firebase";

export default function AddMaterialsModal({ openModal, closeModal, classId }) {
  const [nameLink, setNameLink] = useState("");
  const [urlLink, setUrlLink] = useState("");
  const [materialLinks, setMaterialLinks] = useState([]);
  const [selectedMaterialId, setSelectedMaterialId] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  useEffect(() => {
    const fetchMaterialsData = async () => {
      const docSnap = await getDoc(doc(db, "classes", classId));

      if (docSnap.exists()) {
        const classData = docSnap.data();

        const materialData = [];
        for (const materalId of classData.materials) {
          const materialSnap = await getDoc(doc(db, "materials", materalId));

          if (materialSnap.exists()) {
            materialData.push({ id: materialSnap.id, ...materialSnap.data() });
          }
        }
        setMaterialLinks(materialData);
      }
    };
    fetchMaterialsData();
  }, [openModal, materialLinks]);

  const createMaterial = async (e) => {
    e.preventDefault();
    if (nameLink === "" || urlLink === "") {
      setToastMessage("Preencha todos os campos do formulário");
      setToastType("warning");
    } else if (!urlLink.includes("https://")) {
      setToastMessage("Insira um link válido");
      setToastType("warning");
    } else {
      try {
        const materialRef = await addDoc(collection(db, "materials"), {
          name: nameLink,
          url: urlLink,
        });

        await updateDoc(doc(db, "classes", classId), {
          materials: arrayUnion(materialRef.id),
        });

        setToastMessage("Material adicionado com sucesso!");
        setToastType("success");

        setNameLink("");
        setUrlLink("");

        setTimeout(() => {
          setToastMessage("");
          setToastType("");
        }, 5000);
      } catch (error) {
        console.error(error);
        setToastMessage(error.message);
        setToastType("warning");
      }
    }
  };

  const deleteMaterial = async () => {
    try {
      await deleteDoc(doc(db, "materials", selectedMaterialId));

      await updateDoc(doc(db, "classes", classId), {
        materials: arrayRemove(selectedMaterialId),
      });

      setToastMessage("Material deletado com sucesso");
      setToastType("success");

      selectedMaterialId("")

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
        <form className="modal-form" onSubmit={createMaterial}>
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
            {materialLinks.map((material) => (
              <MaterialLinks
                key={material.id}
                name={material.name}
                url={material.url}
                admin={true}
                deleteFunc={()=>{
                  setSelectedMaterialId(material.id)
                  deleteMaterial()
                }}
              />
            ))}
          </ul>
        </form>
      </div>
    </div>
  );
}
