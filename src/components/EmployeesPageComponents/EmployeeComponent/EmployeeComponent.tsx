import {FC, useRef, useState} from "react";
import {IEmployee} from "../../../models/IEmployee.ts";
import styles from "./Employee.module.css"
import {useAppDispatch} from "../../../redux/store.ts";
import {employeesActions} from "../../../redux/slices/employeesSlice.ts";
import {userService} from "../../../services/userService.ts";
import useAuth from "../../../customHooks/useAuth.tsx";
import useClickOutside from "../../../customHooks/useClickOutside.tsx";

type IProps = {
    employee: IEmployee;
    handleUpdateFormOpening: (employeeId: string) => void;
}

const EmployeeComponent: FC<IProps> = ({employee, handleUpdateFormOpening}) => {

    const dispatch = useAppDispatch();

    const MAX_VISIBLE_ROLES = 2;
    const visibleRoles = employee.roles?.slice(0, MAX_VISIBLE_ROLES);
    const hiddenRoleCount = employee.roles?.length - visibleRoles?.length;
    const userInfo = useAuth();

    const [isActionsVisible, setIsActionsVisible] = useState<boolean>(false);

    const actionsRef = useRef<HTMLDivElement>(null);
    const actionsButtonRef = useRef<HTMLButtonElement>(null);
    useClickOutside([actionsRef, actionsButtonRef], () => setIsActionsVisible(false));

    const handleEmployeeDelete = async (employeeId:string) => {
        await userService.deleteById(employeeId)
        dispatch(employeesActions.loadEmployees());
    }

    const handleBlockEmployee = async (employeeId:string) => {
        await userService.blockUser(employeeId)
        dispatch(employeesActions.loadEmployees());
    }

    const handleUnblockEmployee = async (employeeId:string) => {
        await userService.unblockUser(employeeId)
        dispatch(employeesActions.loadEmployees());
    }

    return (
        <tr key={employee._id} className={styles["employee-row"]}>
            <td>
                <input type="checkbox"/>
            </td>
            <td>
                <div className={styles.employeeInfo}>
                    <div>
                        <p>{`${employee.name} ${employee.surname}`}</p>
                    </div>
                </div>
            </td>
            <td>#{employee._id}</td>
            <td><span>{employee._position?.name}</span></td>
            <td>{employee._department?.name.map((departmentName) => <span>{departmentName} </span>)}</td>
            {/*<td className={styles["roles"]}>{employee.roles.map((role, index) =>
                    <span className={styles["role"]} key={index}>{role}</span>)}
                </td>*/}
            <td className={styles["roles"]}>
                {visibleRoles.map((role, index) => (
                    <span className={styles["role"]} key={index}>{role}</span>
                ))}
                {hiddenRoleCount > 0 && (
                    <span className={styles["role"]}>+{hiddenRoleCount}</span>
                )}
            </td>
            <td style={{position: 'relative'}}>
                <button className={styles.moreActions} ref={actionsButtonRef} onClick={() => isActionsVisible ? setIsActionsVisible(false) : setIsActionsVisible(true)}>⋮</button>
                {isActionsVisible && (
                    <div className={styles["employee-actions"]} ref={actionsRef}>
                        <span onClick={() => handleUpdateFormOpening(employee._id)}>Update</span>
                        <span onClick={() => handleEmployeeDelete(employee._id)}>Delete</span>
                        {userInfo?._roles.includes("admin") && !employee.isBlocked &&
                            <span onClick={() => handleBlockEmployee(employee._id)}>Block</span>
                        }
                        {userInfo?._roles.includes("admin") && employee.isBlocked &&
                            <span onClick={() => handleUnblockEmployee(employee._id)}>Unblock</span>
                        }
                        {userInfo?._roles.includes("admin") &&
                            <span>Assign department</span>
                        }
                    </div>
                )}
            </td>
        </tr>
    );
};

export default EmployeeComponent;