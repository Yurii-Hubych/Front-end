import {FC, useState} from "react";
import {useForm} from "react-hook-form";
import {UpdateEmployeeInfo} from "../../../custom-types/Employee.type.ts";
import {joiResolver} from "@hookform/resolvers/joi";
import {DepartmentValidator} from "../../../validators/departmentValidator.ts";
import {useAppDispatch} from "../../../redux/store.ts";
import {IEmployee} from "../../../models/IEmployee.ts";
import {departmentActions} from "../../../redux/slices/departmentSlice.ts";
import styles from "../UpdateDepartmentInfoComponent/UpdateDepartmentInfoComponent.module.css";
import {IDepartment} from "../../../models/IDepartment.ts";
import {departmentService} from "../../../services/departmentService.ts";

type IProps = {
    department: IDepartment | null;
    onClose: () => void;
}

const RemoveEmployeesFromDepartmentComponent:FC<IProps> = ({department, onClose}) => {

    const {
        handleSubmit,
    } = useForm<UpdateEmployeeInfo>({
        defaultValues: {name: department?.name},
        resolver: joiResolver(DepartmentValidator.updateDepartment),
        mode: "all"
    })

    const dispatch = useAppDispatch();
    const [selectedEmployees, setSelectedEmployees] = useState<IEmployee[]>([]);

    const handleManageDepartmentEmployeesSubmit = async () => {
        await departmentService.removeDepartmentMembers(department!._id, selectedEmployees.map(emp => emp._id));
        onClose();
        dispatch(departmentActions.loadDepartments());
    };

    const handleEmployeeClick = (employee: IEmployee) => {
        setSelectedEmployees((prevState) => {
            const employeeIds = new Set(prevState.map(emp => emp._id));
            if (employeeIds.has(employee._id)) {
                return prevState.filter(emp => emp._id !== employee._id);
            }
            return [...prevState, employee];
        });

    };

    return (
        <div className={styles["update-department-container"]}>
            <form action="" onSubmit={handleSubmit(handleManageDepartmentEmployeesSubmit)}
                  className={styles["update-department-form"]}>
                <div className={styles["employees-section"]}>
                    {department?.members && department?.members.length > 0 &&
                        <ul>
                            {department?.members.map((employee) => {
                                return (
                                    <li key={employee._id}
                                        onClick={() => handleEmployeeClick(employee)}
                                        style={{
                                            cursor: "pointer",
                                            background: selectedEmployees.some(emp => emp._id === employee._id) ? "red" : "#767e94",
                                        }}
                                    >
                                        <span>{employee.name} {employee.surname}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    }
                    {department?.members.length === 0 && <span>No employees are found</span>}
                </div>

                <div className={styles["form-buttons"]}>
                    <button type={"submit"}>Save</button>
                    <button onClick={() => onClose()}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default RemoveEmployeesFromDepartmentComponent;