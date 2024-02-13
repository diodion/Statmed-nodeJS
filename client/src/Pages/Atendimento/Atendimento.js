// import React, { useCallback, useEffect, useRef } from 'react';
// import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded';
// import Swal from 'sweetalert2';
// import { useState } from 'react';
// import useAuth from '../../Hooks/useAuth';
// import { axiosPrivate } from '../../Api/axios';
// Em tratamento: mudar a pagina de atendimento
// export default function Atendimento() {
//     useEffect(() => {
//         document.title = 'Statmed - Registrar Paciente';
//     }, []);

//     const { auth } = useAuth();

//     // Data Atual no Input
//     const date = new Date();
//     let currentDay = String(date.getDate()).padStart(2, '0');
//     let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
//     let currentYear = date.getFullYear();
//     let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;

//     const [data, setData] = useState({
//         idSame: '',
//         data: currentDate,
//         atendente: auth.nome,
//         epidemia: ''
//     })

//     const [atdPega, setAtdPega] = useState({
//         nome: '',       
//         nomeSocial: '',
//         dataNasc: '',
//         genero: '',
//         cpf: '',
//         email: '',
//         telefone: '',
//     });

//     const pegaIdSame = useCallback(async () => {
//         try {
//             const response = await axiosPrivate.get(process.env.REACT_APP_API_PEGAIDSAME + "/" + data.idSame);
//             setAtdPega({
//                 nome: response.data.nome,
//                 nomeSocial: response.data.nomeSocial,
//                 dataNasc: response.data.dataNasc,
//                 genero: response.data.genero,
//                 cpf: response.data.cpf,
//                 email: response.data.email,
//                 telefone: response.data.telefone,
//             });
//         } catch (error) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Erro',
//                 text: 'Paciente não encontrado!'
//             })
//         }
//     }, [data.idSame]);
    
//     const handle = e => {
//         const newData = { ...data}
//         newData[e.target.id] = e.target.value
//         setData(newData)
//     }

//     // Variáveis para mostrar o idAtendimento do paciente que foi criado
//     const sucessoRef = useRef();
//     const [sucessoMsg, setSucessoMsg] = useState('');

//     const submit = async (e) => {
//         e.preventDefault();
//         try {
//             const postaxios = await axiosPrivate.post(url,
//                 JSON.stringify({
//                     usuarioIdFunc: atendentePega,
//                     data: dataPega,
//                     epidemia: epidemiaPega,
//                     pacienteIdSame: idSamePega,
//                     anamnese: anamneseDefault
//                 })
//             );
//             console.log(postaxios.data.anamnese)
//             // let nomeCriado = nomeRef.current.value;
//             e.target.reset();
//             setIsChecked(false);
//             // let idAtendimentoCriado = (postaxios.data.idAtendimento)
//             // setSucessoMsg("Consulta do paciente " + nomeCriado + " foi salvo com sucesso! Seu nº de Atendimento é " + idAtendimentoCriado);
//             Swal.fire({
//                 icon: 'success',
//                 title: 'Consulta Registrada!',
//                 showConfirmButton: true,
//                 text: 'Consulta de ' + nomeCriado + ' registrada no Atendimento ' + idAtendimentoCriado
//             });
//         } catch (err) {
//             if (!err?.response) {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Erro',
//                     text: 'Falha de comunicação com servidor, Contate seu Administrator.'
//                 })
//             } else if (err.response?.status === 401) {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Erro',
//                     text: 'Falha de permissão.'
//                 })
//             } else if (err.response?.status === 404) {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Erro',
//                     text: 'Falha de comunicação com servidor, Contate seu Administrator.'
//                 })
//             } else if (err.response?.status === 500) {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Erro',
//                     text: 'CPF já cadastrado, confirme no busca cadastro os dados!'
//                 })
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Erro',
//                     text: 'Falha de comunicação com servidor, Contate seu Administrator.'
//                 })
//             }
//         }
//     }

//     return (
//         <div className="container-fluid ms-3">
//             <h3 className="text-uppercase fw-normal mt-3 mb-3">Criar Atendimento</h3>
//             <div className="me-3">
//                 <form onSubmit={submit}>
//                     <div className="w-100 d-inline-flex flex-row justify-content-start align-items-start">
//                         <div className="form-floating mb-3 me-3 w-10">
//                             <input autoFocus onChange={(e) => handle(e)} value={data.idSame} onBlur={pegaIdSame} type="number" className="form-control w-100" id="idSame" autoComplete='off' placeholder="Example input" />
//                             <label htmlFor="floatingInput">ID Same       <ManageSearchRoundedIcon /></label>
//                         </div>
//                         <div className="form-floating mb-3 me-3 w-25">
//                             <input onChange={(e) => handle(e)} type="name" value={data.atendente} className="form-control w-100" id="idFunc_Usuario" placeholder="Example input" readOnly />
//                             <label htmlFor="floatingInput">Atendente </label>
//                         </div>

//                         <div className="form-floating mb-3 me-3 w-10">
//                             <input onChange={(e) => handle(e)} value={data.data} type="normal" className="form-control w-100" id="dataAtend" placeholder="Example input" readOnly />
//                             <label htmlFor="floatingInput">Data Atendimento</label>
//                         </div>
//                         <div className="form-check mb-3">
//                             <input className="form-check-input" onChange={(e) => handle(e)} value={data.epidemia} type="checkbox"  id="epidemia" />
//                             <label className="form-check-label" htmlFor="epidemia">
//                                 Epidemia?
//                             </label>
//                         </div>

//                     </div>

//                     <div className="w-100 d-inline-flex flex-row justify-content-start align-items-start">
//                         <div className="form-floating mb-3 flex-fill">
//                             <input onChange={(e) => handle(e)} value={atdPega.nome}  type="text" className="form-control w-100" id="nome" autoComplete='off' placeholder="Example input"  />
//                             <label htmlFor="floatingInput">Nome</label>
//                         </div>

//                     </div>
//                     <div className="w-100 d-inline-flex flex-row justify-content-start align-items-start">
//                         <div className="form-floating mb-3 flex-fill">
//                             <input onChange={(e) => handle(e)} value={atdPega.nomeSocial} type="text" className="form-control w-100" id="nomeSocial" placeholder="Example input" readOnly />
//                             <label htmlFor="floatingInput">Nome Social</label>
//                         </div>
//                     </div>

//                     <div className="w-100 d-inline-flex flex-row justify-content-start align-items-start">
//                         <div className="form-floating mb-3 me-3 w-50">
//                             <input onChange={(e) => handle(e)} value={atdPega.genero} type="text" className="form-control" id="genero" placeholder="Example input" readOnly />
//                             <label htmlFor="floatingInput">Genêro</label>
//                         </div>
//                         <div className="form-floating mb-3 me-3 w-25">
//                             <input onChange={(e) => handle(e)} value={atdPega.DataNasc} type="text" className="form-control" id="dataNasc" placeholder="Example input" readOnly />
//                             <label htmlFor="floatingInput">Idade</label>
//                         </div>
//                         <div className="form-floating mb-3 w-25">
//                             <input onChange={(e) => handle(e)} value={atdPega.cpf} type="text" className="form-control" id="cpf" placeholder="Example input" readOnly />
//                             <label htmlFor="floatingInput">CPF</label>
//                         </div>
//                     </div>

//                     <div className="w-100 d-inline-flex flex-row justify-content-start align-items-start">
//                         <div className="form-floating mb-3 me-3 w-50">
//                             <input onChange={(e) => handle(e)} value={atdPega.email} type="email" className="form-control" id="email" placeholder="Example input" readOnly />
//                             <label htmlFor="floatingInput">E-mail</label>
//                         </div>

//                         <div className="form-floating mb-3 w-50">
//                             <input onChange={(e) => handle(e)} value={atdPega.telefone} type="tel" maxLength="15" className="form-control" id="telefone" placeholder="Example input" readOnly />
//                             <label htmlFor="floatingInput">Telefone</label>
//                         </div>
//                     </div>
//                     <button className="btn btn-bscpac btn-lg btn-primary btn-padrao text-uppercase mb-2">Criar Atendimento</button>
//                 </form>
//                 <div className="w-100 d-inline-flex flex-row justify-content-center align-items-center">
//                     <span className={sucessoMsg ? "mensagem-sucesso text-uppercase" : ""} aria-live="assertive" ref={sucessoRef}>{sucessoMsg}</span>
//                 </div>
//             </div>
//         </div>
//     )
// }