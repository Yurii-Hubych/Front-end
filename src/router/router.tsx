import {createBrowserRouter, RouteObject} from "react-router-dom";
import MainPage from "../pages/MainPage.tsx";
import AuthLayout from "../layouts/AuthLayout/AuthLayout.tsx";
import SignUpComponent from "../components/Auth/SignUpComponent/SignUpComponent.tsx";
import SignInComponent from "../components/Auth/SignInComponent/SignInComponent.tsx";
import ForgotPasswordEmailComponent from "../components/Auth/ForgotPasswordComponents/ForgotPasswordEmailComponent.tsx";
import SetForgotPasswordComponent from "../components/Auth/ForgotPasswordComponents/SetForgotPasswordComponent.tsx";
import EmployeesPage from "../pages/EmployeesPage.tsx";
import MainLayout from "../layouts/MainLayout/MainLayout.tsx";
import DepartmentsPage from "../pages/DepartmentsPage.tsx";

const routes: RouteObject[] = [
    //TODO add secured layout
    {
        path: "/", element: <MainLayout/>, children: [
            {path: "", element: <MainPage/>},
            {path: "employees", element: <EmployeesPage/>},
            {path: "departments", element: <DepartmentsPage/>},
        ],
    },
    {
        path: "auth", element: <AuthLayout/>, children: [
            {path: "register", element: <SignUpComponent/>, children: []},
            {path: "login", element: <SignInComponent/>, children: []},
            {path: "password/change", element: <MainPage/>, children: []},
            {path: "password/forgot", element: <ForgotPasswordEmailComponent/>, children: []},
            {path: "password/forgot/:actionToken", element: <SetForgotPasswordComponent/>, children: []},
            {path: "register-admin", element: <MainPage/>, children: []},
            {path: "email-verification/:actionToken", element: <MainPage/>, children: []}
        ]
    }
]

export const router = createBrowserRouter(routes)