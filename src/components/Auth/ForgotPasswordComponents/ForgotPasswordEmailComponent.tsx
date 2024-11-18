import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {UserValidator} from "../../../validators/userValidator.ts";
import {useNavigate} from "react-router-dom";
import {authService} from "../../../services/authService.ts";
import generalStyles from "../AuthForm.module.css";
import styles from "../SignInComponent/SignInComponent.module.css";
import InputErrorComponent from "../InputErrorComponent.tsx";

type IForgotPasswordEmailForm = {
    email: string
}

const ForgotPasswordEmailComponent = () => {
    const {
        handleSubmit,
        register,
        formState: {errors}
    } = useForm({defaultValues: {email: "yura.ghubych123@gmail.com"}, resolver: joiResolver(UserValidator.resetPasswordSendToken), mode: "all"});

    const navigate = useNavigate();

    const sendForgotPasswordToken = async (formData: IForgotPasswordEmailForm):Promise<void> => {
        const isSuccess = await authService.acquireForgotPasswordToken(formData.email);
        if (isSuccess) {
            navigate("/auth/login");
        }
    }

    return (
        <div className={generalStyles["auth-forms-container"]}>
            <form className={generalStyles.form} action="" onSubmit={handleSubmit(sendForgotPasswordToken)}>
                <h1>Restore password</h1>
                <div className={generalStyles["input-container"]}>
                    <input type="email" {...register("email")} placeholder="Email"
                           className={`${styles.input} ${errors.email ? styles.inputError : ""}`}/>
                    <InputErrorComponent message={errors.email?.message}/>
                </div>

                <button type="submit" className={generalStyles["submit-button"]}>Restore password</button>
            </form>
            <div className={generalStyles["form-right-side"]}>
                <div className={generalStyles["image-container"]}><img src="/images/photo_2024-11-06_21-54-25.jpg" alt=""/></div>
                <p className={generalStyles["already-exists-or-new-user-text"]} onClick={() => navigate("/auth/login")}>Go back to login</p>
            </div>
        </div>
    );
};

export default ForgotPasswordEmailComponent;