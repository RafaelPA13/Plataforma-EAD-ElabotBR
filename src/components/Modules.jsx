import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMenu } from "react-icons/io5";

import ClassLinks from "./ClassLinks";

import { useState } from "react";

export default function Modules({
  admin,
  module,
  active,
  index,
  moveModuleUp,
  moveModuleDown,
}) {
  const [open, setOpen] = useState(false);

  return (
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
              <button>
                <FaPlus />
              </button>
              <button>
                <MdEdit />
              </button>
              <button>
                <MdDelete />
              </button>
            </span>
          </>
        ) : (
          <div className="w-full flex justify-between items-center">
            <h2 className="text-lg font-semibold">Nome Módulo</h2>
            <IoMenu className="text-2xl" />
          </div>
        )}
      </div>
      <ul
        className={`duration-500 ease-in-out overflow-hidden ${
          open ? "max-h-[1000px]" : "max-h-0"
        }`}
      >
        <ClassLinks admin={admin} />
        <ClassLinks admin={admin} />
        <ClassLinks admin={admin} />
      </ul>
    </li>
  );
}
