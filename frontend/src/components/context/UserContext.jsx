import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import { createContext, useEffect, useState } from "react";
// Create a Context
export const userContext = createContext();

// Create a Component wrapper from Context.Provider
const UserProvider = (props) => {
    // Here is our Shared State Object
    //------------------------STATES------------------------------------------///
    const [authenticated, setAuthenticated] = useState("");
    const [userName, setUserName] = useState(Cookies.get("qiUsername"));
    const [accessToken, setAccessToken] = useState(Cookies.get("qiAccessToken"));

    useEffect(() => {
        const decoded = jwtDecode(accessToken);
        console.log(decoded);
    }, []);

    const login = (token) => {
        const decoded = jwtDecode(token);
        Cookies.set("qiUsername", decoded.username);
        Cookies.set("qiEmail", decoded.email);
        Cookies.set("qiAccessToken", token);
    };

    const logout = () => {};

    const providerData = {
        authenticated,
        login,
    };

    // We can now use this as a component to wrap anything
    // that needs our state
    return <userContext.Provider value={providerData}>{props.children}</userContext.Provider>;
};

export default UserProvider;
