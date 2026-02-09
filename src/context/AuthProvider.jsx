import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(() => {
        // Inicializa o estado a partir do localStorage
        const storedAuth = localStorage.getItem('auth');
        if (storedAuth) {
            try {
                return JSON.parse(storedAuth);
            } catch (err) {
                console.error('Erro ao recuperar autenticação:', err);
                localStorage.removeItem('auth');
                return {};
            }
        }
        return {};
    });

    // Salva o token no localStorage quando muda
    useEffect(() => {
        if (auth?.accessToken) {
            localStorage.setItem('auth', JSON.stringify(auth));
        } else if (Object.keys(auth).length === 0) {
            localStorage.removeItem('auth');
        }
    }, [auth]);

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;