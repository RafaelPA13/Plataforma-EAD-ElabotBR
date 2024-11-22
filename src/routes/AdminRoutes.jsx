import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/AdminNavbar";

export default function Admin() {
  return (
    <div className="h-screen flex flex-col md:flex-row">
      <AdminSidebar />
      <Outlet />
    </div>
  );
}
