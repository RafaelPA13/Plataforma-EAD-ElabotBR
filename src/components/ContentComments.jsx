import { IoSend } from "react-icons/io5";
import Comment from "./Comment";

export default function ContentComments() {
  return (
    <div className="tabs-content">
      <span className="flex items-center gap-3 title">
        <h1>Comentários</h1>
        <p className="w-[25px] h-[25px] bg-gradient-to-r from-primary to-secondary text-sm text-light flex items-center justify-center rounded-lg">
          0
        </p>
      </span>
      <form className="bg-light-green p-3 rounded-lg flex justify-between">
        <img src="/perfil-desconhecido.svg" alt="perfil" className="size-10" />
        <input
          type="text"
          placeholder="Escreva o seu comentário:"
          className="w-[90%] bg-light-green outline-none"
        />
        <button className="text-secondary text-xl">
          <IoSend />
        </button>
      </form>
      <ul className="flex flex-col gap-5">
        <Comment />
        <Comment />
      </ul>
    </div>
  );
}
