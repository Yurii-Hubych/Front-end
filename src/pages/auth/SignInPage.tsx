import SignInComponent from "../../components/Auth/SignInComponent/SignInComponent.tsx";
import {authService} from "../../services/authService.ts";

const SignInPage = () => {

    const handleGetGoogleCode = async () => {
        window.location.href = await authService.googleAuthGetCode();
    }

    return (
        <div>
            <SignInComponent handleGetGoogleCode={handleGetGoogleCode}/>
        </div>
    );
};

export default SignInPage;