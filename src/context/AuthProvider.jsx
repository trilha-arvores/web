import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6M30.CabPQ9sgvAOEFD2lOFzlxkU4-ujQrplZiFARqSJCkZ8"});

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;