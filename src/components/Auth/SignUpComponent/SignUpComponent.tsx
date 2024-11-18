import {useForm} from "react-hook-form";
import {authService} from "../../../services/authService.ts";
import {useNavigate} from "react-router-dom";
import {IAuthRegisterModel} from "../../../models/IAuthRegisterModel.ts";
import {UserValidator} from "../../../validators/userValidator.ts";
import {joiResolver} from "@hookform/resolvers/joi";
import generalStyles from "../AuthForm.module.css";
import InputErrorComponent from "../InputErrorComponent.tsx";
import {FaEye} from "react-icons/fa";
import {useState} from "react";
import {useAppDispatch} from "../../../redux/store.ts";
import {userNotificationsActions} from "../../../redux/slices/userNotificationsSlice.ts";

type IFormInput = IAuthRegisterModel & {confirmPassword: string};

const SignUpComponent = () => {

    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm<IFormInput>({
        defaultValues:
            {
                email: "yura.ghubych123@gmail.com",
                password: "Q.eu456123",
                name: "Yura",
                surname: "Hubych",
                confirmPassword: "Q.eu456123"
            },
        mode: "all",
        resolver: joiResolver(UserValidator.register) });

    const navigate = useNavigate();
    const [isPasswordSeen, setIsPasswordSeen] = useState<boolean>(false);
    const [isConfirmPasswordSeen, setIsConfirmPasswordSeen] = useState<boolean>(false)
    const dispatch = useAppDispatch();


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const registerUser = async ({confirmPassword, ...dataToSubmit}: IFormInput):Promise<void> => {
        const isSuccess = await authService.register(dataToSubmit as IAuthRegisterModel);
        dispatch(userNotificationsActions.setRegistrationSuccess(isSuccess));
        if (isSuccess) {
            navigate("/auth/login");
        }
    }

    return (
        <div className={generalStyles["auth-forms-container"]}>
            <form className={generalStyles.form} action="" onSubmit={handleSubmit(registerUser)}>
                <h1>Sign up</h1>
                <div className={generalStyles["input-container"]}>
                    <input type="text" {...register("name")} placeholder="Name"/>
                    <InputErrorComponent message={errors.name?.message}/>
                </div>

                <div className={generalStyles["input-container"]}>
                    <input type="text" {...register("surname")} placeholder="Surname"/>
                    <InputErrorComponent message={errors.surname?.message}/>
                </div>

                <div className={generalStyles["input-container"]}>
                    <input type="email" {...register("email")} placeholder="Email"/>
                    <InputErrorComponent message={errors.email?.message}/>
                </div>
                <div className={generalStyles["input-container"]}>
                    <input type={isPasswordSeen ? "text" : "password"} {...register("password")} placeholder="Password"/>
                    <FaEye onClick={() => setIsPasswordSeen(!isPasswordSeen)}/>
                    <InputErrorComponent message={errors.password?.message}/>
                </div>

                <div className={generalStyles["input-container"]}>
                    <input
                        type={isConfirmPasswordSeen ? "text" : "password"}
                        {...register("confirmPassword")}
                        placeholder="Confirm Password"
                    />
                    <FaEye onClick={() => setIsConfirmPasswordSeen(!isConfirmPasswordSeen)}/>
                    <InputErrorComponent message={errors.confirmPassword?.message}/>
                </div>

                <button className={generalStyles["submit-button"]} type="submit">Sign up</button>
            </form>
            <div className={generalStyles["form-right-side"]}>
            <div className={generalStyles["image-container"]}><img src="/images/photo_2024-11-06_21-54-29.jpg" alt=""/></div>
                <p className={generalStyles["already-exists-or-new-user-text"]} onClick={() => navigate("/auth/login")}>I already have a profile</p>
            </div>
        </div>
    );
};

export default SignUpComponent;