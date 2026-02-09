import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "./Loading";

const RequireAuth = () => {
    const {auth} = useAuth();
    const location = useLocation();

    // Verifica se o auth está carregado (não é undefined)
    if (auth === undefined) {
        return <Loading />;
    }

    return (
        auth?.accessToken
            ? <Outlet/>
            : <Navigate to="/login" state={{ from: location}} replace />
    );
}

export default RequireAuth;