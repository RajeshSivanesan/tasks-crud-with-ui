import { createContext, useState } from "react";
export const AuthContext = createContext({});

export const ProvideAuth = ({ children }: React.PropsWithChildren) => {
    const getSession = () => {
        try {
            return JSON.parse(localStorage.getItem('session') ?? JSON.stringify({}));
        } catch(ex) {
            return {}
        }
    };
    /**
    * setToken from localstorage
    */
    const setSessionInLocalStorage = (token: string) => {
        localStorage.setItem('session', JSON.stringify(token))
        return true
    };

    const auth = getSession();

    const [session, setSession] = useState(auth || '');

    const setAuth = (token: string) => {
        setSession(token);
        setSessionInLocalStorage(token);
    };
    const { user, token } = session;
    
    return (
        <AuthContext.Provider value= {{ user, token, setAuth }}>
            { children }
        </AuthContext.Provider>
    )
};