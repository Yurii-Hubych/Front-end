import {DNA} from "react-loader-spinner";
import styles from "./Loader.module.css"

const LoaderComponent = () => {
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

export default LoaderComponent;