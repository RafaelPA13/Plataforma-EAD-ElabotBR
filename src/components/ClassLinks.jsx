import { IoMdPlayCircle } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

import { Link } from "react-router-dom";

export default function ClassLinks({ admin }) {
  return (
    <li className="bg-light-green py-3 px-5 flex justify-between items-center">
      {admin ? (
        <>
          <div className="flex gap-5 items-center">
            <span className="flex flex-col items-center">
              <button>
                <IoMdArrowDropup />
              </button>
              <p>1</p>
              <button>
                <IoMdArrowDropdown />
              </button>
            </span>
            <h2 className="text-lg font-semibold">Nome Módulo</h2>
          </div>
          <span className="flex items-center gap-5 text-lg">
              <p className="font-semibold">Ativo</p>
              <button>
                <MdEdit />
              </button>
              <button>
                <MdDelete />
              </button>
            </span>
        </>
      ) : (
        ""
      )}
    </li>
  );
}
