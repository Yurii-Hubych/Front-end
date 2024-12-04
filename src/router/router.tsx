import {createBrowserRouter, RouteObject} from "react-router-dom";
import MainPage from "../pages/MainPage.tsx";
import AuthLayout from "../layouts/AuthLayout/AuthLayout.tsx";
import ForgotPasswordEmailComponent from "../components/Auth/ForgotPasswordComponents/ForgotPasswordEmailComponent.tsx";
import SetForgotPasswordComponent from "../components/Auth/ForgotPasswordComponents/SetForgotPasswordComponent.tsx";
import EmployeesPage from "../pages/EmployeesPage.tsx";
import MainLayout from "../layouts/MainLayout/MainLayout.tsx";
import DepartmentsPage from "../pages/DepartmentsPage.tsx";
import GoogleCallbackPage from "../pages/GoogleCallbackPage.tsx";
import SignInPage from "../pages/auth/SignInPage.tsx";
import SignUpPage from "../pages/auth/SignUpPage.tsx";

const routes: RouteObject[] = [
    {
        path: "/", element: <MainLayout/>, children: [
            {path: "", element: <MainPage/>},
            {path: "employees", element: <EmployeesPage/>},
            {path: "departments", element: <DepartmentsPage/>},
        ],
    },
    {
        //TODO redo logic for sign pages, maybe to put components in one page
        path: "auth", element: <AuthLayout/>, children: [
            {path: "register", element: <SignUpPage/>, children: []},
            {path: "login", element: <SignInPage/>, children: []},
            {path: "password/change", element: <MainPage/>, children: []},
            {path: "password/forgot", element: <ForgotPasswordEmailComponent/>, children: []},
            {path: "password/forgot/:actionToken", element: <SetForgotPasswordComponent/>, children: []},
            {path: "register-admin", element: <MainPage/>, children: []},
            {path: "email-verification/:actionToken", element: <MainPage/>, children: []},
            {path: "google/callback", element: <GoogleCallbackPage/>, children: []},
        ]
    }
]

export const router = createBrowserRouter(routes)