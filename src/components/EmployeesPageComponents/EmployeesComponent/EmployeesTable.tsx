import styles from "./Employees.module.css";
import {IEmployee} from "../../../models/IEmployee.ts";
import EmployeeComponent from "../EmployeeComponent/EmployeeComponent.tsx";
import {FC} from "react";

type IProps = {
    employees: IEmployee[];
    updateEmployeeFormOpeningHandler: (employeeId: string) => void;
}

const EmployeesTable:FC<IProps> = ({employees, updateEmployeeFormOpeningHandler}) => {
    return (
        <>
            <table className={styles.employeeTable}>
                <thead>
                <tr>
                    <th>
                        <input type="checkbox"/>
                    </th>
                    <th>Name</th>
                    <th>Employee ID</th>
                    <th>Position</th>
                    <th>Department</th>
                    <th>Roles</th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                {employees.map((employee: IEmployee) =>
                    <EmployeeComponent
                        employee={employee}
                        handleUpdateFormOpening={updateEmployeeFormOpeningHandler}
                        key={employee._id}/>).slice(0, 5)}
                </tbody>
            </table>
        </>
    );
};

export default EmployeesTable;