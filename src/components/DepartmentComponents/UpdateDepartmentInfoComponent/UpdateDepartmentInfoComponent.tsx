import {FC} from "react";
import {IDepartment} from "../../../models/IDepartment.ts";
import {useForm} from "react-hook-form";
import {UpdateEmployeeInfo} from "../../../custom-types/Employee.type.ts";
import {joiResolver} from "@hookform/resolvers/joi";
import styles from "./UpdateDepartmentInfoComponent.module.css"
import InputErrorComponent from "../../Auth/InputErrorComponent.tsx";
import {useAppDispatch} from "../../../redux/store.ts";
import {departmentActions} from "../../../redux/slices/departmentSlice.ts";
import {DepartmentValidator} from "../../../validators/departmentValidator.ts";
import {departmentService} from "../../../services/departmentService.ts";


type IProps = {
    department: IDepartment | null;
    setIsFormVisible: (isVisible: boolean) => void;
}

const UpdateDepartmentInfoComponent: FC<IProps> = ({department, setIsFormVisible}) => {

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<UpdateEmployeeInfo>({
        defaultValues: {name: department?.name},
        resolver: joiResolver(DepartmentValidator.updateDepartment),
        mode: "all"
    })

    const dispatch = useAppDispatch();

    const handleUpdateDepartmentSubmit = async (data: UpdateEmployeeInfo) => {
        await departmentService.updateDepartmentInfo(department!._id, data)
        setIsFormVisible(false);
        dispatch(departmentActions.loadDepartments());
    };

    return (
        <div className={styles["update-department-container"]}>
            <form action="" onSubmit={handleSubmit(handleUpdateDepartmentSubmit)}
                  className={styles["update-department-form"]}>
                <div className={styles["input-container"]}>
                    <input type="text" {...register("name")} placeholder="Name"/>
                    <InputErrorComponent message={errors.name?.message}/>
                </div>

                <div className={styles["form-buttons"]}>
                    <button type={"submit"}>Save</button>
                    <button onClick={() => setIsFormVisible(false)}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateDepartmentInfoComponent;