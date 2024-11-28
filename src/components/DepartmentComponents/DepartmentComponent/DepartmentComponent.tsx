import {FC} from "react";
import {IDepartment} from "../../../models/IDepartment.ts";
import styles from "./DepartmentComponent.module.css"

type IProps = {
    department: IDepartment;
    onDelete: (departmentId: string) => void;
    onOpenUpdateForm: (departmentId: string) => void;
    onOpenAddEmployees: (departmentId: string) => void;
    onOpenRemoveEmployees: (departmentId: string) => void;
}

const DepartmentComponent: FC<IProps> = (
    {
        department,
        onDelete,
        onOpenUpdateForm,
        onOpenAddEmployees,
        onOpenRemoveEmployees,
    }) => {

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
                <button onClick={() => onOpenAddEmployees(department._id)}>Add Employee</button>
                <button onClick={() => onOpenRemoveEmployees(department._id)}>Remove Employee</button>
                <button onClick={() => onOpenUpdateForm(department._id)}>Update Info</button>
                <button onClick={() => onDelete(department._id)}>Delete Department</button>
            </div>
        </div>
    );
};

export default DepartmentComponent;