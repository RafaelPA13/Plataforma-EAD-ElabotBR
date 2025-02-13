import { FaCirclePlay } from "react-icons/fa6";

import { Link } from "react-router-dom";

export default function MiniClassLinks () {
    return (
        <Link to={""} className="flex items-center gap-2 py-2 px-1 duration-300 hover:bg-emerald-100">
            <FaCirclePlay className="text-primary"/>
            Aula
        </Link>
    )
}