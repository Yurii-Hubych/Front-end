//TODO make form dynamic for create and update


import {FC} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {DepartmentValidator} from "../../../validators/departmentValidator.ts";
import {useAppDispatch} from "../../../redux/store.ts";
import {departmentService} from "../../../services/departmentService.ts";
import {departmentActions} from "../../../redux/slices/departmentSlice.ts";
import styles from "../UpdateDepartmentInfoComponent/UpdateDepartmentInfoComponent.module.css";
import InputErrorComponent from "../../Auth/InputErrorComponent.tsx";
import {IDepartmentForCreation} from "../../../models/IDepartment.ts";
import useAuth from "../../../customHooks/useAuth.tsx";

type IProps = {
    setIsFormVisible: (isVisible: boolean) => void;
}



const CreateDepartmentComponent:FC<IProps> = ({setIsFormVisible}) => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<IDepartmentForCreation>({
        resolver: joiResolver(DepartmentValidator.updateDepartment),
        mode: "all"
    })

    const dispatch = useAppDispatch();
    const userInfo = useAuth();

    const handleUpdateDepartmentSubmit = async (data: IDepartmentForCreation) => {
        if (!userInfo) return;
        data._adminUser = userInfo?._id;
        await departmentService.createDepartment(data);
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

export default CreateDepartmentComponent;