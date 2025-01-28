import { FaLink } from "react-icons/fa";

export default function MaterialLinks({ name, url }) {
  return (
    <a
      href={url}
      className="bg-light-green p-3 rounded-lg text-primary font-semibold flex items-center gap-2"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaLink />
      {name}
    </a>
  );
}
