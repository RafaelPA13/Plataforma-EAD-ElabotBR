import { MdFavoriteBorder } from "react-icons/md";

export default function AnswerComment() {
  return (
    <li className="pl-0 md:pl-16">
      <span className="flex items-start justify-between">
        <img src="/perfil-desconhecido.svg" alt="" className="size-10" />
        <div className="w-[85%] flex flex-col gap-3 md:w-[90%] lg:w-[95%]">
          <h1 className="text-lg font-semibold">Nome</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
            iusto ullam illum cumque facilis. Eius rem incidunt doloribus
            voluptate quo itaque placeat, totam minima aspernatur, distinctio
            ab, nobis sapiente exercitationem!
          </p>
          <span className="flex gap-5">
            <span className="flex items-center gap-2">
              <button className="text-primary">
                <MdFavoriteBorder />
              </button>
              <p>Gostei: 0</p>
            </span>
          </span>
        </div>
      </span>
    </li>
  );
}
