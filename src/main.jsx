import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//Authentication Pages
import LoginPage from "./pages/AuthPages/LoginPage.jsx";
import RegisterPage from "./pages/AuthPages/RegisterPage.jsx";
import RecoverPasswordPage from "./pages/AuthPages/RecoverPasswordPage.jsx";
import RedefinePasswordPage from "./pages/AuthPages/RedefinePasswordPage.jsx";
import ChooseRoutePage from "./pages/AuthPages/ChooseRoutePage.jsx";

// Client Pages
import ClientHomePage from "./pages/ClientPages/Home.jsx";
import CompanyCoursesPage from "./pages/ClientPages/CompanyCourses.jsx";
import CoursesPage from "./pages/ClientPages/CoursesPage.jsx";
import VideoPage from "./pages/ClientPages/VideoPage.jsx";

//ConsultantPages
import ConsultantHomePage from "./pages/ConsultantPages/Home.jsx";

//Admin Pages
import DashboardPage from "./pages/AdminPages/DashboardPage.jsx";
import CompanyPage from "./pages/AdminPages/CompanyPage.jsx";
import ClassPage from "./pages/AdminPages/ClassesPage.jsx";
import UsersPage from "./pages/AdminPages/UsersPage.jsx";
import SellPage from "./pages/AdminPages/SellPage.jsx";
import MetricPage from "./pages/AdminPages/MetricPage.jsx";
import CompanyDetailPage from "./pages/AdminPages/CompanyDetail.jsx";
import CourseDetailPage from "./pages/AdminPages/CourseDetail.jsx";

import "./App.css";
import Authentication from "./routes/AuthenticationRoutes.jsx";
import Client from "./routes/ClientRoutes.jsx";
import Consultant from "./routes/ConsultantRoutes.jsx";
import Admin from "./routes/AdminRoutes.jsx";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Authentication />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "registro", element: <RegisterPage /> },
      { path: "recuperar-senha", element: <RecoverPasswordPage /> },
      { path: "redefinir-senha", element: <RedefinePasswordPage /> },
      {
        path: "escolher-rota",
        element: (
          <ProtectedRoutes>
            <ChooseRoutePage />
          </ProtectedRoutes>
        ),
      },
    ],
  },
  {
    path: "/cliente/",
    element: (
      <ProtectedRoutes>
        <Client />
      </ProtectedRoutes>
    ),
    children: [
      { index: true, element: <ClientHomePage /> },
      { path: "aulas/:companyId", element: <CompanyCoursesPage /> },
      { path: "aulas/:companyId/curso/:courseId", element: <CoursesPage /> },
      { path: "aulas/:companyId/curso/:courseId/video/:classId", element: <VideoPage /> },
    ],
  },
  {
    path: "/consultor/",
    element: (
      <ProtectedRoutes>
        <Consultant />
      </ProtectedRoutes>
    ),
    children: [{ index: true, element: <ConsultantHomePage /> }],
  },
  {
    path: "/admin/",
    element: (
      <ProtectedRoutes>
        <Admin />
      </ProtectedRoutes>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "empresas", element: <CompanyPage /> },
      { path: "aulas", element: <ClassPage /> },
      { path: "aulas/:companyId", element: <CompanyDetailPage /> },
      {
        path: "aulas/:companyId/cursos/:courseId",
        element: <CourseDetailPage />,
      },
      { path: "usuarios", element: <UsersPage /> },
      { path: "vendas", element: <SellPage /> },
      { path: "metricas", element: <MetricPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
