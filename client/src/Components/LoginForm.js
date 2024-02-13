import { React, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../Api/axios";
import useAuth from "../Hooks/useAuth";
import EnviaBT from "./UI/EnviarBT";

function LoginForm() {
    useEffect(() => {
        document.title = "Statmed - Login";
    }, []);
    // Usa o hook do setAuth pra tornar o login permanente ou não
    const { setAuth, persistente, setPersistente } = useAuth();
    // Variavéis e hooks para redirecionar ápos o login
    const navegar = useNavigate();
    const local = useLocation();
    const de = local.state?.from?.pathname || "/inicio"; // caso o usuário deslogou de certa página ele retornar pra ela, se não for o caso vai para o inicio
    // Mensagem de erro do form
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState("");
    const [usuarioValue, setUsuario] = useState("");
    const [senhaValue, setSenha] = useState("");
    useEffect(() => {
        setErrMsg("");
    }, [usuarioValue, senhaValue]);
    // Lembrar Login
    const togglePersistente = () => {
        setPersistente(prev => !prev);
    }

    useEffect (() => {
        localStorage.setItem("persistente", persistente)
    }, [persistente])
    // Botão responsivo
    const [showLoader, setShowLoader] = useState(false)
    // Início do post de login
    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowLoader(true)
        setTimeout(() => setShowLoader(false), 1000)
        try {
            const response = await axiosPrivate.post(
                process.env.REACT_APP_API_LOGIN,
                JSON.stringify({
                    usuario: usuarioValue,
                    senha: senhaValue
                })
            );
            // Salva informações da api de login para uso no useAuth
            const accesstoken = response?.data?.response?.login1?.refresh_token;
            const cargos = response?.data?.response?.login1?.id_cargo;
            const nomeLogin = response?.data?.response?.login1?.nome;
            const crmLogin = response?.data?.response?.login1?.crm;
            const nascLogin = response?.data?.response?.login1?.data_nasc;
            const emailLogin = response?.data?.response?.login1?.email;
            const cpfLogin = response?.data?.response?.login1?.cpf;
            setAuth({
                usuario: usuarioValue,
                senha: senhaValue,
                cargos: cargos,
                accessToken: accesstoken,
                nome: nomeLogin,
                crm: crmLogin,
                data_nascimento: nascLogin,
                email: emailLogin,
                cpf: cpfLogin,
            });
            setUsuario("");
            setSenha("");
            // Muda o usuário de página
            navegar(de, { replace: true });
        } catch (err) {
            if (!err?.response) {
            } else if (err.response?.status === 401) {
                setErrMsg("Usuário ou senha inválida!");
            } else if (err.response?.status === 403) {
                setErrMsg(
                    "Usuário bloqueado ou desativado, contate seu administrador"
                );
            } else {
                setErrMsg("Erro inesperado, contate seu administrador!");
            }
            errRef.current.focus();
        }
    };
    
    return (
        <>
            <h3 className="login-heading mb-4">Bem vindo(a)!</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className={
                            errMsg ? "form-control  errmsg" : "form-control"
                        }
                        id="usuario"
                        autoComplete="off"
                        onChange={(e) => setUsuario(e.target.value)}
                        value={usuarioValue}
                        placeholder="Example input"
                        autoFocus
                        required
                    />
                    <label htmlFor="floatingInput">Usuário</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className={
                            errMsg ? "form-control  errmsg" : "form-control"
                        }
                        id="senha"
                        onChange={(e) => setSenha(e.target.value)}
                        value={senhaValue}
                        placeholder="Example input"
                        required
                    />
                    <label htmlFor="floatingPassword">Senha</label>
                    <span
                        className={errMsg ? "errmsg ajuda text-uppercase" : ""}
                        aria-live="assertive"
                        ref={errRef}
                    >
                        {errMsg}
                    </span>
                </div>

                <div className="form-check mb-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="persistente"
                        onChange={togglePersistente}
                        checked={persistente}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="persistente"
                    >
                        Lembrar
                    </label>
                </div>

                <div className="d-grid">
                    <EnviaBT
                        text="Entrar"
                        className="btn btn-lg btn-primary btn-padrao text-uppercase mb-2"
                        loading={showLoader}
                        disabled={showLoader}
                    />                    
                </div>
            </form>
        </>
    );
}

export default LoginForm;
