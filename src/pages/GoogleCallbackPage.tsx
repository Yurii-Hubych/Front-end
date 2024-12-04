import LoaderComponent from "../components/Loader/LoaderComponent.tsx";
import {useEffect} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {authService} from "../services/authService.ts";

const GoogleCallbackPage = () => {

    const [searchParams,] = useSearchParams();
    const navigate = useNavigate();

    const getProfile = async () => {
        const code = searchParams.get("code");
        if (code) {
            const isAuthenticated = await authService.googleAuthCallback(code);
            if (isAuthenticated) {
                navigate("/");
            }
            console.log(isAuthenticated);
        }
    }

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <div>
            <LoaderComponent/>
        </div>
    );
};

export default GoogleCallbackPage;