import {useNavigate} from "react-router-dom";

const UseLogOut = () => {
    const navigate = useNavigate();

    return () => {
        localStorage.removeItem("tokenPair");
        localStorage.removeItem("userInfo");
        navigate("/auth/login", {replace: true});
    }
};

export default UseLogOut;