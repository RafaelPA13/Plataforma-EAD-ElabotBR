import { IoMdClose } from "react-icons/io";

export default function EditProfileModal({ openModal, closeModal }) {
  if (!openModal) return null;

  return (
    <div className="fixed inset-0 z-40">
      <div className="h-screen bg-black bg-opacity-50 flex items-center justify-center font-poppins">
        <form className="w-[75%] bg-light rounded-2xl p-10 flex flex-col items-center gap-4 relative lg:w-[25%] shadow-lg">
          <button
            className="absolute left-6 text-2xl p-2 border-2 border-secondary rounded-full duration-300 hover:bg-secondary hover:text-light"
            onClick={closeModal}
          >
            <IoMdClose />
          </button>
          <img
            src="/perfil-desconhecido.svg"
            alt="perfil"
            className="size-32"
          />
          <label className="self-start font-semibold">Nome:</label>
          <input type="text" className="input" />
          <label className="self-start font-semibold">Biografia:</label>
          <textarea className="w-full h-[150px] p-2 border-2 border-zinc-500 rounded-lg placeholder:text-zinc-500 focus:outline outline-secondary md:p-4 lg:h-[150px]"></textarea>
          <button className="btn-green">Salvar</button>
        </form>
      </div>
    </div>
  );
}
