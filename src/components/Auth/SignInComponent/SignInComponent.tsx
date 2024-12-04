import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {authService} from "../../../services/authService.ts";
import {joiResolver} from "@hookform/resolvers/joi";
import {UserValidator} from "../../../validators/userValidator.ts";
import {ILoginCredentials} from "../../../models/ILoginCredentials.ts";
import styles from "./SignInComponent.module.css"
import generalStyles from "../AuthForm.module.css"
import InputErrorComponent from "../InputErrorComponent.tsx";
import {FC, useEffect, useState} from "react";
import { FaEye } from "react-icons/fa";
import {useAppDispatch, useAppSelector} from "../../../redux/store.ts";
import {toastError} from "../../../errors/ToastError.ts";
import {userNotificationsActions} from "../../../redux/slices/userNotificationsSlice.ts";
import {toast} from "react-toastify";

type IProps = {
    handleGetGoogleCode: () => void;
}

const SignInComponent:FC<IProps> = ({handleGetGoogleCode}) => {

    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm<ILoginCredentials>({defaultValues: {email: "yura.ghubych123@gmail.com", password: "Q.eu456123"}, resolver: joiResolver(UserValidator.login), mode: "all"});

    const {accessDenied, registrationSuccess} = useAppSelector(state => state.userNotificationsSlice)
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [isPasswordSeen, setIsPasswordSeen] = useState<boolean>(false);

    useEffect(() => {
        if (accessDenied) {
            toastError("Access denied")
            dispatch(userNotificationsActions.setAccessDenied(false))
        }
        if (registrationSuccess) {
            toast.success("Registration success, confirm your email")
            dispatch(userNotificationsActions.setRegistrationSuccess(false))
        }
    }, [accessDenied]);

    const registerUser = async (formData: ILoginCredentials):Promise<void> => {
        const isSuccess = await authService.login(formData);
        if (isSuccess) {
            navigate("/");
        }
    }

    return (
        <div className={generalStyles["auth-forms-container"]}>
            <form className={generalStyles.form} action="" onSubmit={handleSubmit(registerUser)}>
                <h1>Sign in</h1>

                <div className={generalStyles["input-container"]}>
                    <input type="email" {...register("email")} placeholder="Email"
                           className={`${styles.input} ${errors.email ? generalStyles["input-error"] : ""}`}/>
                    <InputErrorComponent message={errors.email?.message}/>
                </div>

                <div className={generalStyles["input-container"]}>
                    <input type={isPasswordSeen ? "text" : "password"} {...register("password")} placeholder="Password"
                           className={`${styles.input} ${errors.password ? generalStyles["input-error"] : ""}`}/>
                    <FaEye onClick={() => setIsPasswordSeen(!isPasswordSeen)}/>
                    <InputErrorComponent message={errors.password?.message}/>
                </div>

                <p className={styles["forgot-password-text"]} onClick={() => navigate("/auth/password/forgot")}>Forgot
                    password</p>

                <div style={{cursor:"pointer"}} onClick={handleGetGoogleCode}>google</div>
                <button type="submit" className={generalStyles["submit-button"]}>Sign in</button>
            </form>
            <div className={generalStyles["form-right-side"]}>
                <div className={generalStyles["image-container"]}><img src="/images/photo_2024-11-06_21-54-25.jpg" alt=""/></div>
                <p className={generalStyles["already-exists-or-new-user-text"]} onClick={() => navigate("/auth/register")}>I'm just getting started</p>
            </div>
        </div>
    );
};

export default SignInComponent;