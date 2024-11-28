import {DNA} from "react-loader-spinner";
import styles from "./Loading.module.css"

const LoadingComponent = () => {
    return (
        <div className={styles["loaderContainer"]}>
            <DNA
                visible={true}
                height="200"
                width="200"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        </div>
    );
};

export default LoadingComponent;