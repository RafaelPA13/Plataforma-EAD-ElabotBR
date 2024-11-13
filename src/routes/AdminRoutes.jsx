import { useState } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/AdminNavbar";

export default function Admin() {
  const [open, setOpen] = useState(true);
  return (
    <div className="h-screen flex">
      <AdminSidebar
        open={open}
        toggleSideBar={() => {
          setOpen(!open);
        }}
      />
      <div className={open ? "hidden lg:block" : "block"}>
        <Outlet />
      </div>
    </div>
  );
}
