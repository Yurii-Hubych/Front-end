import {useEffect, useState} from "react";
import { ITokenPayload} from "../models/IToken.ts";
import {retriveLocalStorageData} from "../services/helpers/retrieveLocalStorageData.ts";

const UseAuth = () => {
    const [userPayload, setUserPayload] = useState<ITokenPayload | null>(null);

    useEffect(() => {
        const user = retriveLocalStorageData<ITokenPayload>("userInfo");
        if (user) {
            setUserPayload(user);
        }
    }, []);

    return userPayload;

};

export default UseAuth;