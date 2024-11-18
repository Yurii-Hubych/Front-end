import {FC} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {EmployeeValidator} from "../../../validators/employeeValidator.ts";
import InputErrorComponent from "../../Auth/InputErrorComponent.tsx";
import styles from "./UpdateEmployeeComponent.module.css"
import {employeeService} from "../../../services/employeeService.ts";
import {UpdateEmployeeInfo} from "../../../custom-types/Employee.type.ts";
import {IEmployee} from "../../../models/IEmployee.ts";
import {useAppDispatch} from "../../../redux/store.ts";
import {employeesActions} from "../../../redux/slices/employeesSlice.ts";

type IProps = {
    employee: IEmployee | null;
    setIsFormVisible: (isVisible: boolean) => void;
}

const UpdateEmployeeComponent:FC<IProps> = ({employee, setIsFormVisible}) => {

    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<UpdateEmployeeInfo>({defaultValues: {name: employee?.name, surname: employee?.surname},resolver: joiResolver(EmployeeValidator.updateEmployee), mode: "all"})

    //TODO implement position update
    const handleUpdateEmployeeSubmit = async (data: UpdateEmployeeInfo) => {
        await employeeService.updateEmployeeInfo(employee!._id,data)
        setIsFormVisible(false);
        dispatch(employeesActions.loadEmployees());
    };

    return (
        <div className={styles["update-employee-container"]}>
            <form action="" onSubmit={handleSubmit(handleUpdateEmployeeSubmit)} className={styles["update-employee-form"]}>
                <div className={styles["input-container"]}>
                    <input type="text" {...register("name")} placeholder="Name"/>
                    <InputErrorComponent message={errors.name?.message}/>
                </div>
                <div className={styles["input-container"]}>
                    <input type="text" {...register("surname")} placeholder={"Surname"}/>
                    <InputErrorComponent message={errors.surname?.message}/>
                </div>

                <div className={styles["form-buttons"]}>
                    <button type={"submit"}>Save</button>
                    <button onClick={() => setIsFormVisible(false)}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateEmployeeComponent;