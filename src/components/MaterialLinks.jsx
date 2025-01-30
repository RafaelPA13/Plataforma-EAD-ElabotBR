import { FaLink } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function MaterialLinks({ name, url, admin, deleteFunc }) {

  return (
    <div className="flex gap-2">
      <a
        href={url}
        className="w-full bg-light-green p-3 rounded-lg text-primary font-semibold flex items-center gap-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLink />
        {name}
      </a>
      <button
        type="button"
        className={admin ? "bg-light-green p-3 rounded-lg text-primary duration-300 hover:bg-neutral-200" : "hidden"}
      >
        <MdDelete />
      </button>
    </div>
  );
}
