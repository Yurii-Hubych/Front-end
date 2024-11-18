import {useAppDispatch} from "../redux/store.ts";
import {useEffect} from "react";
import {departmentActions} from "../redux/slices/departmentSlice.ts";
import DepartmentsComponent from "../components/DepartmentComponents/DepartmentsComponent/DepartmentsComponent.tsx";

const DepartmentsPage = () => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(departmentActions.loadDepartments());
    }, []);

    return (
        <div>
            <DepartmentsComponent/>
        </div>
    );
};

export default DepartmentsPage;