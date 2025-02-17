import { MdFavoriteBorder } from "react-icons/md";
import AnswerComment from "./AnswerComment";
import { useState } from "react";

export default function Comment() {
  const [open, setOpen] = useState(false);

  return (
    <li className={`border-b-2 border-primary ${open ? "pb-5" : "pb-0"}`}>
      <span className="flex items-start justify-between pb-5">
        <img src="/perfil-desconhecido.svg" alt="" className="size-10" />
        <div className="w-[85%] flex flex-col gap-3 md:w-[90%] lg:w-[95%]">
          <h1 className="text-lg font-semibold">Nome</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
            iusto ullam illum cumque facilis. Eius rem incidunt doloribus
            voluptate quo itaque placeat, totam minima aspernatur, distinctio
            ab, nobis sapiente exercitationem!
          </p>
          <span className="flex flex-wrap gap-5">
            <span className="flex items-center gap-2">
              <button className="text-primary">
                <MdFavoriteBorder />
              </button>
              <p>Gostei: 0</p>
            </span>
            <button className="p-2 rounded-lg duration-300 hover:bg-slate-200">
              Responder
            </button>
            <button
              className="p-2 rounded-lg duration-300 hover:bg-slate-200"
              onClick={() => setOpen(!open)}
            >
              0 Respostas
            </button>
          </span>
        </div>
      </span>
      <ul
        className={`flex flex-col gap-5 duration-500 ease-in-out overflow-auto ${
          open ? "max-h-[300px]" : "max-h-0"
        }`}
      >
        <AnswerComment />
        <AnswerComment />
      </ul>
    </li>
  );
}
