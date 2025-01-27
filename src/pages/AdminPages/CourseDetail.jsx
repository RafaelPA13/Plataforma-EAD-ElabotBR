import { IoTimeOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";

import Modules from "../../components/Modules";
import EditCourseModal from "../../components/EditCourseModal";
import EditModuleModal from "../../components/EditModuleModal";
import CreateModuleModal from "../../components/CreateModuleModal";
import ToastNotifications from "../../components/ToastNotifications";
import ConfirmModal from "../../components/ConfirmModal";
import CreateClassModal from "../../components/CreateClassModal";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  arrayRemove,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../services/firebase";

export default function CourseDetailPage() {
  const [course, setCourse] = useState([]);
  const [modules, setModules] = useState([]);
  const [openModalCourse, setOpenModalCourse] = useState(false);
  const [openModalCreateModule, setOpenModalCreateModule] = useState(false);
  const [openModalEditModule, setOpenModalEditModule] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [openModalDeleteModule, setOpenModalDeleteModule] = useState(false);
  const [openModalCreateClass, setOpenModalCreateClass] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const { companyId, courseId } = useParams();

  useEffect(() => {
    const fetchCourseData = async () => {
      const docRef = doc(db, "courses", courseId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const courseData = docSnap.data();
        setCourse({ ...courseData, id: docSnap.id });

        const modulesData = [];
        for (const moduleId of courseData.modulesId || []) {
          const moduleRef = doc(db, "modules", moduleId);
          const moduleSnap = await getDoc(moduleRef);

          if (moduleSnap.exists()) {
            modulesData.push({ id: moduleSnap.id, ...moduleSnap.data() });
          }
        }
        modulesData.sort((a, b) => a.index - b.index);
        setModules(modulesData);
      }
    };
    fetchCourseData();
  }, [
    courseId,
    openModalCourse,
    openModalCreateModule,
    openModalEditModule,
    openModalDeleteModule,
    openModalCreateClass,
  ]);

  const moveModuleUp = async (moduleId) => {
    const currentModuleIndex = modules.find(
      (module) => module.id === moduleId
    ).index;

    if (currentModuleIndex === 1) {
      setToastMessage("Você não pode mais subir este módulo");
      setToastType("warning");
      return;
    }

    const moduleAbove = modules.find(
      (module) => module.index === currentModuleIndex - 1
    );

    if (moduleAbove) {
      await updateDoc(doc(db, "modules", moduleId), {
        index: currentModuleIndex - 1,
      });
      await updateDoc(doc(db, "modules", moduleAbove.id), {
        index: currentModuleIndex,
      });
      setModules((prevModules) =>
        prevModules
          .map((module) =>
            module.id === moduleId
              ? { ...module, index: currentModuleIndex - 1 }
              : module.id === moduleAbove.id
              ? { ...module, index: currentModuleIndex }
              : module
          )
          .sort((a, b) => a.index - b.index)
      );
    }
  };

  const moveModuleDown = async (moduleId) => {
    const currentModuleIndex = modules.find(
      (module) => module.id === moduleId
    ).index;

    if (currentModuleIndex === modules.length) {
      setToastMessage("Você não pode mais descer este módulo");
      setToastType("warning");
      return;
    }

    const moduleBelow = modules.find(
      (module) => module.index === currentModuleIndex + 1
    );

    if (moduleBelow) {
      await updateDoc(doc(db, "modules", moduleId), {
        index: currentModuleIndex + 1,
      });
      await updateDoc(doc(db, "modules", moduleBelow.id), {
        index: currentModuleIndex,
      });

      setModules((prevModules) =>
        prevModules
          .map((module) =>
            module.id === moduleId
              ? { ...module, index: currentModuleIndex + 1 }
              : module.id === moduleBelow.id
              ? { ...module, index: currentModuleIndex }
              : module
          )
          .sort((a, b) => a.index - b.index)
      );
    }
  };

  const deleteModule = async () => {
    try {
      await deleteDoc(doc(db, "modules", selectedModuleId));

      await updateDoc(doc(db, "courses", courseId), {
        modulesId: arrayRemove(selectedModuleId),
      });

      const updatedModules = modules
        .filter((module) => module.id !== selectedModuleId)
        .map((module, index) => ({ ...module, index: index + 1 }));

      for (const module of updatedModules) {
        await updateDoc(doc(db, "modules", module.id), { index: module.index });
      }

      setModules(updatedModules);
      setToastMessage("Módulo deletado com sucesso");
      setToastType("warning");
      setSelectedModuleId("");
      setOpenModalDeleteModule(false);

      setTimeout(() => {
        setToastMessage("");
        setToastType("");
      }, 5000);
    } catch (error) {
      console.error;
      setToastMessage(error.message);
      setToastType("danger");
    }
  };

  return (
    <div className="w-full">
      <div className="page">
        <Link
          to={`/admin/aulas/${companyId}`}
          className="flex items-center gap-2 text-xl text-primary cursor-pointer font-semibold"
        >
          <IoIosArrowBack />
          Voltar
        </Link>
        <div className="w-full bg-light-green p-7 rounded-xl">
          <div className="w-full flex flex-col gap-3 lg:w-[50%]">
            <h1 className="text-3xl font-bold">{course.name}</h1>
            <span className="flex flex-wrap gap-5">
              <h2 className="text-lg text-zinc-600">Mentor: {course.mentor}</h2>
              <h2 className="flex items-center gap-2 text-primary">
                <IoTimeOutline />
                02:00
              </h2>
              <h2 className="flex items-center gap-2 text-secondary">
                <FaStar />5
              </h2>
              <h2 className="font-semibold text-tertiary">
                {course.active ? "Ativo" : "Inativo"}
              </h2>
            </span>
            <p>{course.description}</p>
            <button
              className="btn-gradient"
              onClick={() => setOpenModalCourse(true)}
            >
              Editar
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3 items-center justify-between lg md:flex-row">
          <h1 className="w-full text-2xl font-bold">Módulos</h1>
          <button
            className="btn-green"
            onClick={() => setOpenModalCreateModule(true)}
          >
            Adicionar Módulo
          </button>
        </div>
        <ul className="flex flex-col gap-5">
          {modules.map((module) => (
            <Modules
              key={module.id}
              moduleId={module.id}
              admin={true}
              module={module.name}
              active={module.active}
              index={module.index}
              moveModuleUp={() => moveModuleUp(module.id)}
              moveModuleDown={() => moveModuleDown(module.id)}
              openModal={() => {
                setSelectedModuleId(module.id);
                setOpenModalEditModule(true);
              }}
              deleteModal={() => {
                setSelectedModuleId(module.id);
                setOpenModalDeleteModule(true);
              }}
              createClassModal={()=>{
                setSelectedModuleId(module.id)
                setOpenModalCreateClass(true)
              }}
            />
          ))}
        </ul>
      </div>
      <EditCourseModal
        openModal={openModalCourse}
        closeModal={() => setOpenModalCourse(false)}
        courseId={courseId}
      />
      <CreateModuleModal
        openModal={openModalCreateModule}
        closeModal={() => setOpenModalCreateModule(false)}
        courseId={courseId}
      />
      {toastMessage && (
        <ToastNotifications
          message={toastMessage}
          success={toastType === "success"}
          warning={toastType === "warning"}
          danger={toastType === "danger"}
        />
      )}
      <EditModuleModal
        openModal={openModalEditModule}
        closeModal={() => setOpenModalEditModule(false)}
        moduleId={selectedModuleId}
      />
      <ConfirmModal
        message={"Você realmente deseja deletar este módulo"}
        openModal={openModalDeleteModule}
        closeModal={() => setOpenModalDeleteModule(false)}
        deleteFunc={deleteModule}
      />
      <CreateClassModal
        openModal={openModalCreateClass}
        closeModal={() => setOpenModalCreateClass(false)}
        moduleId={selectedModuleId}
      />
    </div>
  );
}
