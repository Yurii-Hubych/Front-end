import {FC, useRef, useState} from "react";
import {CiSettings, CiBellOn, CiSearch} from "react-icons/ci";
import styles from "./HeaderComponent.module.css";
import useClickOutside from "../../customHooks/useClickOutside.tsx";
import useLogOut from "../../customHooks/useLogOut.tsx";

const HeaderComponent: FC = () => {

    const [isDropdownOpened, setIsDropdownOpened] = useState<boolean>(false);
    const actionRef = useRef<HTMLDivElement>(null);
    const actionButtonRef = useRef<HTMLButtonElement>(null);
    useClickOutside([actionRef, actionButtonRef], () => setIsDropdownOpened(false));

    const logOut = useLogOut();

    return (
        <header className={styles.header}>
            <nav>
                <section className={styles["search-section"]}>
                    <input id="header-search-input" type="text" placeholder=" "/>
                    <label htmlFor="header-search-input" className={styles["search-section-label"]}>
                        <CiSearch/>
                        <span>Search anything here</span>
                    </label>
                </section>
                <section className={styles["user-info"]}>
                    <CiSettings/>
                    <CiBellOn/>
                    <div className={styles["user-image-container"]}
                         onClick={() => isDropdownOpened ? setIsDropdownOpened(false) : setIsDropdownOpened(true)}>
                        <img src="./public/images/vite.svg" alt=""/>
                    </div>
                </section>
                {isDropdownOpened &&
                    <div className={styles["header-dropdown"]}>
                        <span>Profile</span>
                        <span onClick={logOut}>Log out</span>
                    </div>}
            </nav>
        </header>
    );
};

export default HeaderComponent;