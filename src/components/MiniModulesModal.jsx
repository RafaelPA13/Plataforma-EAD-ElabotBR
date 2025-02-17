import MiniModules from "./MiniModules";

export default function MiniModulesModal({ openModal, closeModal }) {
  if (!openModal) return null;

  return (
    <div className="modal-index">
      <div className="modal-bg">
        <ul className="w-full h-screen bg-light-green rounded-xl p-5 flex flex-col gap-5 overflow-auto md:w-[75%]">
          <MiniModules />
          <MiniModules />
          <button
            onClick={closeModal}
            className="bg-slate-300 p-2 rounded-xl font-semibold"
          >
            Fechar
          </button>
        </ul>
      </div>
    </div>
  );
}
