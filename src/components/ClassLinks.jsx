import { IoMdPlayCircle } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";

import { Link } from "react-router-dom";

export default function ClassLinks({ admin }) {
  return (
    <li className="bg-light py-3 px-5">
      {admin ? (
        <Link className="flex justify-between items-center">
          <div className="flex gap-5 items-center text-primary">
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
          <span className="flex items-center gap-5 text-lg text-secondary">
            <p className="font-semibold">Ativo</p>
            <button>
              <MdEdit />
            </button>
            <button>
              <FaBook />
            </button>
            <button>
              <MdDelete />
            </button>
          </span>
        </Link>
      ) : (
        <Link className="flex justify-between items-center">
          <div className="flex gap-5 items-center text-primary">
            <IoMdPlayCircle />
            <h2 className="text-lg font-semibold">Nome Módulo</h2>
          </div>
          <span className="flex items-center gap-5 text-lg">
            <h2 className="flex gap-2 items-center text-primary">
              <IoTimeOutline />
              00
            </h2>
            <h2 className="flex gap-2 items-center text-secondary">
              <FaStar />0
            </h2>
          </span>
        </Link>
      )}
    </li>
  );
}
