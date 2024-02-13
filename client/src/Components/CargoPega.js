import useAuth from "../Hooks/useAuth";

const CargoPega = ({ cargoCompara }) => {
    const { auth } = useAuth();
    const comparar = auth?.cargos?.split(",") || [];
    
    return (
        comparar.find(compara => cargoCompara.includes(compara))
    );
}

export default CargoPega;