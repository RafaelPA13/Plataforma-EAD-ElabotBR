import MiniClassLinks from "./MiniClassLinks";

import { useState } from "react";

export default function MiniModules() {
    const [open, setOpen] = useState(false)

  return (
      <li>
        <span className="flex items-center justify-between font-semibold text-lg border-b-2 border-zinc-400 pb-2 cursor-pointer" onClick={()=>setOpen(!open)}>
          <h3>Módulo</h3>
          <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            1/2
          </h3>
        </span>
        <ul className={`duration-500 ease-in-out overflow-hidden ${open ? "max-h-[300px]" : "max-h-0"}`}>
          <MiniClassLinks />
          <MiniClassLinks />
        </ul>
      </li>
  );
}
