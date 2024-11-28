import {lazy, Suspense} from "react";
import {useAppDispatch, useAppSelector} from "../../../redux/store.ts";
import DepartmentComponent from "../DepartmentComponent/DepartmentComponent.tsx";
import {IDepartment} from "../../../models/IDepartment.ts";
import {CiCirclePlus, CiSearch} from "react-icons/ci";
import {IoFilter} from "react-icons/io5";
import styles from "./DepartmentsComponent.module.css";
import {useForm} from "react-hook-form";
import {useDepartmentModals} from "../../../customHooks/UseDepartmentModals.tsx";
import {departmentService} from "../../../services/departmentService.ts";
import {departmentActions} from "../../../redux/slices/departmentSlice.ts";
import LoadingComponent from "../../Loading/LoadingComponent.tsx";

const UpdateDepartmentInfoComponent = lazy(() => import("../UpdateDepartmentInfoComponent/UpdateDepartmentInfoComponent.tsx"));
const AddEmployeesToDepartmentComponent = lazy(() => import("../AddEmployeesToDepartmentComponent/AddEmployeesToDepartmentComponent.tsx"));
const CreateDepartmentComponent = lazy(() => import("../CreateDepartmentComponent/CreateDepartmentComponent.tsx"));
const RemoveEmployeesFromDepartmentComponent = lazy(() => import("../RemoveEmployeesFromDepartmentComponent/RemoveEmployeesFromDepartmentComponent.tsx"));

type SearchFormData = {
    search: string;
}

const DepartmentsComponent = () => {

    //TODO move hard logic to and page
    //TODO add pagination
    const {departments} = useAppSelector(state => state.departmentsSlice);
    const dispatch = useAppDispatch();

    const {modals, selectedDepartment, openModal, closeModal} = useDepartmentModals();
    const {register, handleSubmit} = useForm<SearchFormData>();

    const handleDeleteDepartment = async (departmentId: string) => {
        await departmentService.deleteDepartment(departmentId);
        dispatch(departmentActions.loadDepartments());
    };

    //TODO: Implement search functionality
    //TODO Single Department Component

    const handleSearch = (data: { search: string }) => {
        console.log("Search query:", data.search);
        // Add search logic here
    };

    return (
        <div>
            <span className={styles["department-header"]}>
                <h1>Departments</h1>

                <button onClick={() => openModal("createDepartment", null)}>
                    <CiCirclePlus/>
                    <span>
                        New Department
                    </span>
                </button>
            </span>
            <div className={styles["search-filters-bar"]}>
                <span className={styles["search-input"]}>
                    <form action="" onSubmit={handleSubmit(handleSearch)} className={styles["search-input-form"]}>
                        <CiSearch/>
                        <input type="text" {...register("search")} placeholder={"Search for departments by name"}/>
                    </form>
                </span>
                <span className={styles["filter"]}>
                    <IoFilter/>
                    Filter
                </span>
            </div>

            <div className={styles["departments-container"]}>
                {departments.map((department: IDepartment) => <DepartmentComponent
                    key={department._id}
                    department={department}
                    onDelete={handleDeleteDepartment}
                    onOpenUpdateForm={() => openModal("updateDepartmentInfo", department)}
                    onOpenAddEmployees={() => openModal("addEmployees", department)}
                    onOpenRemoveEmployees={() => openModal("removeEmployees", department)}
                />)
                }
            </div>

            <Suspense fallback={<LoadingComponent/>}>
                {modals.updateDepartmentInfo && (
                    <UpdateDepartmentInfoComponent
                        department={selectedDepartment}
                        onClose={() => closeModal("updateDepartmentInfo")}
                    />
                )}
                {modals.addEmployees && (
                    <AddEmployeesToDepartmentComponent
                        department={selectedDepartment}
                        onClose={() => closeModal("addEmployees")}
                    />
                )}
                {modals.removeEmployees && (
                    <RemoveEmployeesFromDepartmentComponent
                        department={selectedDepartment}
                        onClose={() => closeModal("removeEmployees")}
                    />
                )}
                {modals.createDepartment && (
                    <CreateDepartmentComponent onClose={() => closeModal("createDepartment")} />
                )}
            </Suspense>
        </div>
    )
};

export default DepartmentsComponent;