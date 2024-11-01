import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Authentication Pages
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import RecoverPasswordPage from "./pages/RecoverPasswordPage.jsx";
import RedefinePasswordPage from "./pages/RedefinePasswordPage.jsx";

// Student Pages
import CoursesPage from "./pages/CoursesPage.jsx";

//Admin Pages
import DashboardPage from "./pages/DashboardPage.jsx";

import "./App.css";
import Authentication from "./routes/AuthenticationRoutes.jsx";
import Student from "./routes/StudentRoutes.jsx";
import Admin from "./routes/AdminRoutes.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Authentication />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "registro", element: <RegisterPage /> },
      { path: "recuperar-senha", element: <RecoverPasswordPage /> },
      { path: "redefinir-senha", element: <RedefinePasswordPage /> },
    ],
  },
  {
    path: "/aluno",
    element: <Student />,
    children: [{ index: true, element: <CoursesPage /> }],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [{ index: true, element: <DashboardPage /> }],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
