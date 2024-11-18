import {FC} from "react";
import styles from "./SidebarComponent.module.css";
import {useNavigate} from "react-router-dom";
import {MdDashboard} from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";
import {HiOutlineOfficeBuilding} from "react-icons/hi";

const SidebarComponent:FC = () => {

    const navigate = useNavigate();
    return (
        <aside className={styles.aside}>
            <div className={styles["company-logo-name"]}>
                <div>
                    <img src="/images/vite.svg" alt=""/>
                </div>
                Aerten
            </div>
            <nav>
                <ul>
                    <li onClick={() => navigate("/")}>
                        <MdDashboard />
                        <span>Dashboard</span>
                    </li>
                    <li onClick={() => navigate("/employees")}>
                        <RiTeamLine />
                        <span>Employees</span>
                    </li>
                    <li onClick={() => navigate("/departments")}>
                        <HiOutlineOfficeBuilding />
                        <span>Departments</span>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default SidebarComponent;