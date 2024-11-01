import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Pages
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import RecoverPasswordPage from "./pages/RecoverPasswordPage.jsx";
import RedefinePasswordPage from "./pages/RedefinePasswordPage.jsx";

import "./App.css";
import Authentication from "./routes/AuthenticationRoutes.jsx";

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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
