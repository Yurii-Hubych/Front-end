import {useAppSelector} from "../../../redux/store.ts";
import DepartmentComponent from "../DepartmentComponent/DepartmentComponent.tsx";
import {IDepartment} from "../../../models/IDepartment.ts";
import {CiCirclePlus, CiSearch} from "react-icons/ci";
import {IoFilter} from "react-icons/io5";
import styles from "./DepartmentsComponent.module.css"
import {useForm} from "react-hook-form";
import {useState} from "react";
import UpdateDepartmentInfoComponent from "../UpdateDepartmentInfoComponent/UpdateDepartmentInfoComponent.tsx";
import ManageDepartmentEmployeesComponent
    from "../ManageDepartmentEmployeesComponent/ManageDepartmentEmployeesComponent.tsx";
import CreateDepartmentComponent from "../CreateDepartmentComponent/CreateDepartmentComponent.tsx";

type SearchFormData = {
    search: string;
}

const DepartmentsComponent = () => {

    //TODO move hard logic to redux and page
    //TODO add pagination
    const {departments} = useAppSelector(state => state.departmentsSlice)

    const [isUpdateDepartmentInfoVisible, setIsUpdateDepartmentInfoVisible] = useState<boolean>(false);
    const [isManageEmployeesVisible, setIsManageEmployeesVisible] = useState<boolean>(false);
    const [isCreateDepartmentVisiable, setIsCreateDepartmentVisiable] = useState<boolean>(false)
    const [selectedDepartment, setSelectedDepartment] = useState<IDepartment | null>(null);

    const updateEmployeeFormOpeningHandler = (departmentId:string) => {
        setSelectedDepartment(departments.find(department => department._id === departmentId) || null);
        setIsUpdateDepartmentInfoVisible(true);
    }

    const handleManageEmployeesOpening = (departmentId:string) => {
        setSelectedDepartment(departments.find(department => department._id === departmentId) || null);
        setIsManageEmployeesVisible(true);
    }

    const {
        register,
        handleSubmit
    } = useForm<SearchFormData>()

    const onSubmit = (formData: SearchFormData) => {
        console.log(formData);
        //TODO: Implement search functionality
    }

    //TODO Single Department Component


    return (
        <div>
            <span className={styles["department-header"]}>
                <h1>Departments</h1>

                <button onClick={() => setIsCreateDepartmentVisiable(true)}>
                    <CiCirclePlus/>
                    <span>
                        New Department
                    </span>
                </button>
            </span>
            <div className={styles["search-filters-bar"]}>
                <span className={styles["search-input"]}>
                    <form action="" onSubmit={handleSubmit(onSubmit)} className={styles["search-input-form"]}>
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
                {departments.map((department: IDepartment) => <DepartmentComponent handleManageEmployeesOpening={handleManageEmployeesOpening} handleUpdateFormOpening={updateEmployeeFormOpeningHandler} department={department}
                                                                                   key={department._id}/>)}
            </div>

            {isUpdateDepartmentInfoVisible &&
                <UpdateDepartmentInfoComponent department={selectedDepartment} setIsFormVisible={setIsUpdateDepartmentInfoVisible}/>
            }

            {
                isManageEmployeesVisible &&
                <ManageDepartmentEmployeesComponent department={selectedDepartment} setIsFormVisible={setIsManageEmployeesVisible}/>
            }

            {
                isCreateDepartmentVisiable &&
                <CreateDepartmentComponent setIsFormVisible={setIsCreateDepartmentVisiable}/>
            }
        </div>
    );
};

export default DepartmentsComponent;