import { axiosPrivate } from "../Api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({});
        try {
            const resposta = await axiosPrivate(process.env.REACT_APP_API_LOGOUT);
        } catch (err) {
            // Inserir erro pro usuário
        }
    }

    return logout
}

export default useLogout;