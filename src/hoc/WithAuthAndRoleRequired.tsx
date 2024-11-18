import {FC, useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {retriveLocalStorageData} from "../services/helpers/retrieveLocalStorageData.ts";
import {IToken, ITokenPayload} from "../models/IToken.ts";
import {jwtDecode} from "jwt-decode";
import {authService} from "../services/authService.ts";
import {useAppDispatch} from "../redux/store.ts";
import {userNotificationsActions} from "../redux/slices/userNotificationsSlice.ts";

const WithAuthRequired = (requiredRoles: [string]) => <T extends object>(Component: FC<T>): FC<T> => {
    const AuthWrapper: FC<T> = (props: T) => {
        const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
        const [isLoading, setIsLoading] = useState(true);
        const dispatch = useAppDispatch();

        const checkAuth = async () => {
            const tokenPair = retriveLocalStorageData<IToken>("tokenPair");
            if (!tokenPair || !tokenPair.accessToken) {
                setIsAuthenticated(false);
                setIsLoading(false);
                return;
            }

            const accessTokenPayload = jwtDecode<ITokenPayload>(tokenPair.accessToken);
            if (!accessTokenPayload.exp) {
                setIsAuthenticated(false);
                setIsLoading(false);
                return;
            }

            const userRoles = accessTokenPayload._roles;
            const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
            if(!hasRequiredRole) {
                setIsAuthenticated(false);
                setIsLoading(false);
                dispatch(userNotificationsActions.setAccessDenied(true))
                return;
            }

            const accessTokenExpiration = new Date(accessTokenPayload.exp * 1000);
            const now = new Date();

            if (accessTokenExpiration < now) {
                const refreshTokenPayload = jwtDecode<{ exp: number }>(tokenPair.refreshToken);
                if (!refreshTokenPayload.exp) {
                    setIsAuthenticated(false);
                    setIsLoading(false);
                    return;
                }
                const refreshTokenExpiration = new Date(refreshTokenPayload.exp * 1000);
                if (refreshTokenExpiration < now) {
                    setIsAuthenticated(false);
                    setIsLoading(false);
                    return;
                } else {
                    const isAuth = await authService.refresh(tokenPair.refreshToken);
                    setIsAuthenticated(isAuth);
                    setIsLoading(false);
                    return;
                }
            }

            setIsAuthenticated(true);
            setIsLoading(false);
        };

        useEffect(() => {
            checkAuth();
        }, []);

        if (isLoading) {
            return <div>Loading...</div>;
        }

        if (!isAuthenticated) {
            return <Navigate to="/auth/login" />;
        }

        return <Component {...props} />;
    };

    return AuthWrapper;
};

export default WithAuthRequired;
