import {FC, useCallback, useEffect, useState} from "react";
import {IEmployee} from "../../../models/IEmployee.ts";
import {useAppDispatch, useAppSelector} from "../../../redux/store.ts";
import styles from "./Employees.module.css"
import {CiCirclePlus, CiSearch} from "react-icons/ci";
import {useForm} from "react-hook-form";
import {IoFilter} from "react-icons/io5";
import UpdateEmployeeComponent from "../UpdateEmployeeComponent/UpdateEmployeeComponent.tsx";
import {useSearchParams} from "react-router-dom";
import {employeesActions} from "../../../redux/slices/employeesSlice.ts";
import {MdNavigateNext} from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";
import EmployeesTable from "./EmployeesTable.tsx";
import {debounce} from "lodash"


type SearchFormData = {
    search: string;
}

const EmployeesComponent: FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    //TODO debounce search
    const {
        register,
        handleSubmit,
         watch
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

    const debounceSearch = useCallback(debounce((formData: SearchFormData) => onSearchSubmit(formData), 500), []);
    const searchValue = watch("search")

    useEffect(() => {
        if (searchValue) debounceSearch({search: searchValue});
        return () => debounceSearch.cancel();
    }, [searchValue]);

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
                    <form action="" onChange={handleSubmit(debounceSearch)} className={styles["search-input-form"]}>
                        <CiSearch/>
                        <input type="text" {...register("search")} placeholder={"Search for employees by name or ID"}/>
                    </form>
                </span>
                <span className={styles["filter"]}>
                    <IoFilter/>
                    Filter
                </span>
            </div>

            <div className={styles.tableContainer}>
                <EmployeesTable employees={employees} updateEmployeeFormOpeningHandler={updateEmployeeFormOpeningHandler}/>
                <nav className={styles["table-navigation"]}>
                    <MdNavigateBefore />
                    <span>1 2 3 4 5 6 7 8 9</span>
                    <MdNavigateNext />
                </nav>
            </div>
            {isUpdateFormVisible && <UpdateEmployeeComponent setIsFormVisible={setIsUpdateFormVisible} employee={selectedEmployee}/>}
        </div>
    );
};
//TODO pagination

export default EmployeesComponent;