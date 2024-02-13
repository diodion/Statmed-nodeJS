import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const CargoRota = ({ cargosPermitidos }) => {
    const { auth } = useAuth();
    const local = useLocation();
    const cargos = auth?.cargos?.split(",") || [];
    // console.log(auth);
    return (
        cargos?.find(cargo => cargosPermitidos?.includes(cargo))
            ? <Outlet />
            : auth?.accessToken
                ? <Navigate to="/proibido" state={{ from: local }} replace />
                : <Navigate to="/" state={{ from: local }} replace />  
    );
}

export default CargoRota;