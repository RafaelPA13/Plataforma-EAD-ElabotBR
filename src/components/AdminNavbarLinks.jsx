import { Link } from "react-router-dom";

export default function AdminNavbarLinks({ open, icon, text, route }) {
  return (
    <Link
      className={`flex items-center ${
        open ? "gap-3" : "justify-center"
      } font-semibold text-2xl text-zinc-500 p-2 md:p-3 rounded-md duration-300 hover:bg-green-100 hover:text-primary`}
      to={route}
    >
      {icon}
      <span className={`hidden md:${open ? "block" : "hidden"}`}>{text}</span>
    </Link>
  );
}
