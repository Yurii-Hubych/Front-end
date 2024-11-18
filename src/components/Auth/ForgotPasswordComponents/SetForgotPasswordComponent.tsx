import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {UserValidator} from "../../../validators/userValidator.ts";
import {useNavigate, useParams} from "react-router-dom";
import {authService} from "../../../services/authService.ts";
import generalStyles from "../AuthForm.module.css";
import styles from "../SignInComponent/SignInComponent.module.css";
import InputErrorComponent from "../InputErrorComponent.tsx";
import {useState} from "react";
import {FaEye} from "react-icons/fa";

type IForgotPasswordForm = {
    password: string,
    confirmPassword: string
}

const SetForgotPasswordComponent = () => {
    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm({defaultValues: {password: "Q.eu456123", confirmPassword: "Q.eu456123"}, resolver: joiResolver(UserValidator.forgotPassword), mode: "all"});

    const {actionToken} = useParams();
    const navigate = useNavigate();
    const [isPasswordSeen, setIsPasswordSeen] = useState<boolean>(false);
    const [isConfirmPasswordSeen, setIsConfirmPasswordSeen] = useState<boolean>(false)

    const forgotPassword = async (formData: IForgotPasswordForm):Promise<void> => {
        if (!actionToken){
            return;
        }
        const isSuccess = await authService.setForgotPassword(formData.password, actionToken);
        if (isSuccess) {
            navigate("/auth/login");
        }
    }

    return (
        <div className={generalStyles["auth-forms-container"]}>
            <form className={generalStyles.form} action="" onSubmit={handleSubmit(forgotPassword)}>
                <h1>Reset password</h1>

                <div className={generalStyles["input-container"]}>
                    <input type={isPasswordSeen ? "text" : "password"} {...register("password")} placeholder="Password"
                           className={`${styles.input} ${errors.password ? styles.inputError : ""}`}/>
                    <FaEye onClick={() => setIsPasswordSeen(!isPasswordSeen)}/>
                    <InputErrorComponent message={errors.password?.message}/>
                </div>

                <div className={generalStyles["input-container"]}>
                    <input type={isConfirmPasswordSeen ? "text" : "password"} {...register("confirmPassword")} placeholder="Confirm password"
                           className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ""}`}/>
                    <FaEye onClick={() => setIsConfirmPasswordSeen(!isConfirmPasswordSeen)}/>
                    <InputErrorComponent message={errors.confirmPassword?.message}/>
                </div>
                <button type="submit" className={generalStyles["submit-button"]}>Submit password</button>
            </form>
            <div className={generalStyles["form-right-side"]}>
                <div className={generalStyles["image-container"]}><img src="/images/photo_2024-11-06_21-54-29.jpg" alt=""/></div>
            </div>
        </div>
    );
};

export default SetForgotPasswordComponent;