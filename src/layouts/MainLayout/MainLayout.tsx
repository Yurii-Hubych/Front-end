import {FC} from 'react';
import HeaderComponent from "../../components/Header/HeaderComponent.tsx";
import {Outlet} from "react-router-dom";
import SidebarComponent from "../../components/Sidebar/SidebarComponent.tsx";
import styles from "./MainLayout.module.css"
import {ToastContainer} from "react-toastify";
import withAuthAndRoleRequired from "../../hoc/WithAuthAndRoleRequired.tsx";

const MainLayout:FC = () => {
    return (
        <div className={styles.layoutContainer}>
            <SidebarComponent/>
            <div className={styles.contentContainer}>
                <HeaderComponent />
                <div className={styles.outletContainer}>
                    <Outlet />
                </div>
            </div>
            <ToastContainer/>
        </div>
    );
};
const mainLayout = withAuthAndRoleRequired(["manager"])(MainLayout);
export default mainLayout;