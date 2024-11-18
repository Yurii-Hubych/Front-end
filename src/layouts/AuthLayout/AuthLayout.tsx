import {FC} from "react";
import {Outlet} from "react-router-dom";
import generalStyles from "../../components/Auth/AuthForm.module.css";
import {ToastContainer} from "react-toastify";

const AuthLayout: FC = () => {
    return (
        <div className={generalStyles.container}>
            <Outlet/>
            <ToastContainer/>
        </div>
    );
};

export default AuthLayout;