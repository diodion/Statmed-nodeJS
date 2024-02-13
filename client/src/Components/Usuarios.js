import { useEffect, useState } from 'react';
import useAxiosPrivate from '../Hooks/useAxiosPrivate';
import { useNavigate, useLocation } from "react-router-dom"

function Usuarios() {
    const [usuarios, setUsuarios] = useState();
    const axiosPrivate = useAxiosPrivate();
    const navegar = useNavigate();
    const local = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const response = await axiosPrivate.get(process.env.REACT_APP_API_USUARIOS, {
                    signal: controller.signal
                });
                isMounted && setUsuarios(response.data);
            } catch (err) {
                // console.error(err);
                navegar('/', { state: { from: local }, replace: true});
            }
        }

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [axiosPrivate, local, navegar])

  return (
    <article>
    <h2>Users List</h2>
    {usuarios?.length
        ? (
            <ul>
                {usuarios.map((usuario, i) => <li key={i}>{usuario?.nome}</li>)}
            </ul>
        ) : <p>No users to display</p>
    }
</article>
  )
}

export default Usuarios