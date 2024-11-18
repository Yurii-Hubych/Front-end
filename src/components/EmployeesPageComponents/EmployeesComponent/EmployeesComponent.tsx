import {FC, useState} from "react";
import {IEmployee} from "../../../models/IEmployee.ts";
import {useAppDispatch, useAppSelector} from "../../../redux/store.ts";
import EmployeeComponent from "../EmployeeComponent/EmployeeComponent.tsx";
import styles from "./Employees.module.css"
import {CiCirclePlus, CiSearch} from "react-icons/ci";
import {useForm} from "react-hook-form";
import {IoFilter} from "react-icons/io5";
import UpdateEmployeeComponent from "../UpdateEmployeeComponent/UpdateEmployeeComponent.tsx";
import {useSearchParams} from "react-router-dom";
import {employeesActions} from "../../../redux/slices/employeesSlice.ts";

type SearchFormData = {
    search: string;
}

const EmployeesComponent: FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const {
        register,
        handleSubmit
    } = useForm<SearchFormData>({defaultValues: {search: searchParams.get("search") || ""}});
    const {employees} = useAppSelector(state => state.employeesSlice);
    const dispatch = useAppDispatch();
    const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(null);
    const [isUpdateFormVisible, setIsUpdateFormVisible] = useState<boolean>(false);

    const onSearchSubmit = async (formData: SearchFormData) => {
        setSearchParams({search: formData.search});
        if (formData.search === "") {
            dispatch(employeesActions.loadEmployees());
            return;
        }
        dispatch(employeesActions.searchForEmployees(formData.search));
    }

    const updateEmployeeFormOpeningHandler = (employeeId:string) => {
        setSelectedEmployee(employees.find(employee => employee._id === employeeId) || null);
        setIsUpdateFormVisible(true);
    }


    //TODO Implement search functionality, filter functionality, and new employee functionality
    return (
        <div>
            <span className={styles["employees-header"]}>
                <h1>Employees</h1>

                <button>
                    <CiCirclePlus/>
                    <span>
                        New employee
                    </span>
                </button>
            </span>
            <div className={styles["search-filters-bar"]}>
                <span className={styles["search-input"]}>
                    <form action="" onSubmit={handleSubmit(onSearchSubmit)} className={styles["search-input-form"]}>
                        <CiSearch/>
                        <input type="text" {...register("search")} placeholder={"Search for employees by name or ID"}/>
                    </form>
                </span>
                <span className={styles["filter"]}>
                    <IoFilter/>
                    Filter
                </span>
            </div>
            {/*<div>
                {employees.map((employee: IEmployee) => <EmployeeComponent employee={employee} key={employee._id}/>)}
            </div>*/}

            <div className={styles.tableContainer}>
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
                            key={employee._id}/>)}
                    </tbody>
                </table>
            </div>
            {isUpdateFormVisible && <UpdateEmployeeComponent setIsFormVisible={setIsUpdateFormVisible} employee={selectedEmployee}/>}
        </div>
    );
};

export default EmployeesComponent;