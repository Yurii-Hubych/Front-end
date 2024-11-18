import {FC} from "react";
import styles from "./AuthForm.module.css"

type InputErrorComponentProps = {
    message: string | undefined;
}

const InputErrorComponent:FC<InputErrorComponentProps> = ({message}) => {
    return (
        <span className={styles["error-message"]}>
            {message && <p>{message}</p>}
        </span>
    );
};

export default InputErrorComponent;