import { Outlet } from "react-router-dom";

import AdminSidebar from "../components/AdminNavbar";

export default function Admin() {
    return (
        <div className="flex">
            <AdminSidebar />
            <Outlet />
        </div>
    )
}