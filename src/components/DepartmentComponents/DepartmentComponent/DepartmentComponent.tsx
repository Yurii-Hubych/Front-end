import {FC} from "react";
import {IDepartment} from "../../../models/IDepartment.ts";
import styles from "./DepartmentComponent.module.css"

type IProps = {
    department: IDepartment;
    handleUpdateFormOpening: (departmentId: string) => void;
    handleManageEmployeesOpening: (departmentId: string) => void;
}

const DepartmentComponent:FC<IProps> = ({department, handleUpdateFormOpening, handleManageEmployeesOpening}) => {
    return (
        <div className={styles["department-container"]}>
            <div className={styles["department-header"]}>
                <h2>{department.name}</h2>
                <div className={styles["admin-info"]}>
                    <strong>Admin:</strong>{" "}
                    {department._adminUser
                        ? `${department._adminUser.name} ${department._adminUser.surname}`
                        : "N/A"}
                </div>
            </div>

            <div className={styles["members-section"]}>
                <h3>Members:</h3>
                {department?.members.length > 0 ? (
                    <ul>
                        {department.members.map((member) => (
                            <li key={member._id} className={styles["department-member"]}>
                                {member.name} {member.surname}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No members in this department</p>
                )}
            </div>
            
            <div className={styles["management-section"]}>
                <button onClick={() => handleManageEmployeesOpening(department._id)}><span>Manage employees</span></button>
                <button onClick={() => handleUpdateFormOpening(department._id)}><span>Update information</span></button>
            </div>
        </div>
    );
};

export default DepartmentComponent;