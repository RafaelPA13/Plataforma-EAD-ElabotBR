import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMenu } from "react-icons/io5";

import ClassLinks from "./ClassLinks";
import ToastNotifications from "./ToastNotifications";
import EditClassModal from "./EditClassModal";
import AddMaterialsModal from "./AddMaterialsModal";

import { useEffect, useState } from "react";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";

export default function Modules({
  moduleId,
  admin,
  module,
  active,
  index,
  moveModuleUp,
  moveModuleDown,
  openModal,
  deleteModal,
  createClassModal,
}) {
  const [open, setOpen] = useState(false);
  const [classes, setClasses] = useState([]);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [openEditClassModal, setOpenEditClassModal] = useState(false);
  const [openMaterialsModal, setOpenMaterialsModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  useEffect(() => {
    const fetchClassesData = async () => {
      const docSnap = await getDoc(doc(db, "modules", moduleId));

      if (docSnap.exists()) {
        const moduleData = docSnap.data();

        const classesData = [];
        for (const classId of moduleData.classesId) {
          const classSnap = await getDoc(doc(db, "classes", classId));

          if (classSnap.exists()) {
            classesData.push({ id: classSnap.id, ...classSnap.data() });
          }
        }
        classesData.sort((a, b) => a.index - b.index);
        setClasses(classesData);
      }
    };
    fetchClassesData();
  }, [open, openEditClassModal, openMaterialsModal]);

  const moveClassUp = async (classId) => {
    const currentClassIndex = classes.find((item) => item.id === classId).index;

    if (currentClassIndex === 1) {
      setToastMessage("Você não pode mais subir esta aula");
      setToastType("warning");
      return;
    }

    const classAbove = classes.find(
      (item) => item.index === currentClassIndex - 1
    );

    if (classAbove) {
      await updateDoc(doc(db, "classes", classId), {
        index: currentClassIndex - 1,
      });
      await updateDoc(doc(db, "classes", classAbove.id), {
        index: currentClassIndex,
      });
      setClasses((prevClasses) =>
        prevClasses
          .map((item) =>
            item.id === classId
              ? { ...item, index: currentClassIndex - 1 }
              : item.id === classAbove.id
              ? { ...item, index: currentClassIndex }
              : item
          )
          .sort((a, b) => a.index - b.index)
      );
    }
  };

  const moveClassDown = async (classId) => {
    const currentClassIndex = classes.find((item) => item.id === classId).index;

    if (currentClassIndex === classes.length) {
      setToastMessage("Você não pode mais descer esta aula");
      setToastType("warning");
      return;
    }

    const classBelow = classes.find(
      (item) => item.index === currentClassIndex + 1
    );

    if (classBelow) {
      await updateDoc(doc(db, "classes", classId), {
        index: currentClassIndex + 1,
      });
      await updateDoc(doc(db, "classes", classBelow.id), {
        index: currentClassIndex,
      });

      setClasses((prevClasses) =>
        prevClasses
          .map((item) =>
            item.id === classId
              ? { ...item, index: currentClassIndex + 1 }
              : item.id === classBelow.id
              ? { ...item, index: currentClassIndex }
              : item
          )
          .sort((a, b) => a.index - b.index)
      );
    }
  };

  return (
    <div className="w-full">
      <li
        className="bg-secondary py-3 rounded-lg flex flex-col"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <div
          className={`text-white ${
            open ? "pb-3" : ""
          } px-5 flex justify-between items-center duration-500`}
        >
          {admin ? (
            <>
              <div className="flex gap-5 items-center">
                <span className="flex flex-col items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveModuleUp();
                    }}
                    className="p-1 rounded hover:bg-green-800"
                  >
                    <IoMdArrowDropup />
                  </button>
                  <p>{index}</p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      moveModuleDown();
                    }}
                    className="p-1 rounded hover:bg-green-800"
                  >
                    <IoMdArrowDropdown />
                  </button>
                </span>
                <h2 className="text-lg font-semibold">{module}</h2>
              </div>
              <span className="flex flex-wrap justify-end items-center gap-5 text-lg">
                <p className="font-semibold">{active ? "Ativo" : "Inativo"}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    createClassModal();
                  }}
                >
                  <FaPlus />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal();
                  }}
                >
                  <MdEdit />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteModal();
                  }}
                >
                  <MdDelete />
                </button>
              </span>
            </>
          ) : (
            <div className="w-full flex justify-between items-center">
              <h2 className="text-lg font-semibold">{module}</h2>
              <IoMenu className="text-2xl" />
            </div>
          )}
        </div>
        <ul
          className={`duration-500 ease-in-out overflow-hidden ${
            open ? "max-h-[1000px]" : "max-h-0"
          }`}
        >
          {classes.map((training) => (
            <ClassLinks
              key={training.id}
              // classId={training.id}
              admin={admin}
              index={training.index}
              name={training.name}
              active={training.active}
              moveClassUp={() => moveClassUp(training.id)}
              moveClassDown={() => moveClassDown(training.id)}
              editClass={() => {
                setSelectedClassId(training.id);
                setOpenEditClassModal(true);
              }}
              addMaterials={() => {
                setSelectedClassId(training.id);
                setOpenMaterialsModal(true);
              }}
            />
          ))}
        </ul>
      </li>
      {toastMessage && (
        <ToastNotifications
          message={toastMessage}
          success={toastType === "success"}
          warning={toastType === "warning"}
          danger={toastType === "danger"}
        />
      )}
      <EditClassModal
        openModal={openEditClassModal}
        closeModal={() => setOpenEditClassModal(false)}
        classId={selectedClassId}
      />

      <AddMaterialsModal
        openModal={openMaterialsModal}
        closeModal={() => setOpenMaterialsModal(false)}
        classId={selectedClassId}
      />
    </div>
  );
}
