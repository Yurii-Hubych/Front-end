import {FC, useEffect, useState} from "react";
import {employeesActions} from "../../../redux/slices/employeesSlice.ts";
import {useForm} from "react-hook-form";
import {UpdateEmployeeInfo} from "../../../custom-types/Employee.type.ts";
import {joiResolver} from "@hookform/resolvers/joi";
import {DepartmentValidator} from "../../../validators/departmentValidator.ts";
import {useAppDispatch, useAppSelector} from "../../../redux/store.ts";
import {IEmployee} from "../../../models/IEmployee.ts";
import {departmentActions} from "../../../redux/slices/departmentSlice.ts";
import styles from "../UpdateDepartmentInfoComponent/UpdateDepartmentInfoComponent.module.css";
import {IDepartment} from "../../../models/IDepartment.ts";
import {departmentService} from "../../../services/departmentService.ts";

type IProps = {
    department: IDepartment | null;
    setIsFormVisible: (isVisible: boolean) => void;
}

const ManageDepartmentEmployeesComponent:FC<IProps> = ({department, setIsFormVisible}) => {

    useEffect(() => {
        dispatch(employeesActions.loadEmployees());
    }, []);

    const {
        handleSubmit,
    } = useForm<UpdateEmployeeInfo>({
        defaultValues: {name: department?.name},
        resolver: joiResolver(DepartmentValidator.updateDepartment),
        mode: "all"
    })

    const dispatch = useAppDispatch();
    const {employees} = useAppSelector(state => state.employeesSlice);
    const [selectedEmployees, setSelectedEmployees] = useState<IEmployee[]>([]);

    const handleManageDepartmentEmployeesSubmit = async () => {
        await departmentService.updateDepartmentMembers(department!._id, selectedEmployees.map(emp => emp._id));
        setIsFormVisible(false);
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
                    {employees.length > 0 &&
                        <ul>
                            {employees.map((employee) => {
                                return (
                                    <li key={employee._id}
                                        onClick={() => handleEmployeeClick(employee)}
                                        style={{
                                            cursor: "pointer",
                                            background: selectedEmployees.some(emp => emp._id === employee._id) ? "green" : "#767e94",
                                        }}
                                    >
                                        <span>{employee.name} {employee.surname}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    }
                </div>

                <div className={styles["form-buttons"]}>
                    <button type={"submit"}>Save</button>
                    <button onClick={() => setIsFormVisible(false)}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default ManageDepartmentEmployeesComponent;