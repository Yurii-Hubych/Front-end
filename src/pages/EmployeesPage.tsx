import EmployeesComponent from "../components/EmployeesPageComponents/EmployeesComponent/EmployeesComponent.tsx";
import {useAppDispatch} from "../redux/store.ts";
import { useEffect} from "react";
import {employeesActions} from "../redux/slices/employeesSlice.ts";

const EmployeesPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(employeesActions.loadEmployees());
    }, []);

    return (
        <div>
            <EmployeesComponent/>
        </div>
    );
};

export default EmployeesPage;