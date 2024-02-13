import axios, { axiosPrivate } from "../../Api/axios";
import React, { useRef, useState, useEffect, useCallback } from 'react';
import Swal from 'sweetalert2';
import EnviaBT from '../../Components/UI/EnviarBT';

export default function CadPaciente() {
    useEffect(() => {
        document.title = 'Statmed - Cadastro de Paciente';
    }, []);
    // Botão responsivo
    const [showLoader, setShowLoader] = useState(false);
    // Inputs
    const [data, setData] = useState({
        nome: '',
        nomeSocial: '',
        genero: '',
        dataNasc: '',
        cpf: '',
        email: '',
        telefone: '',
        cep: '',
        numero: '',
        complemento: ''
    });

    const [endereco, setEndereco] = useState({
        rua: '',
        bairro: '',
        cidade: '',
        uf: ''
    });
    // Formata o campo de telefone
    const handleTel = (event) => {
        let input = event.target
        input.value = telMask(input.value)
    }

    function telMask(value) {
        if (!value) return ""
        value = value.replace(/\D/g, '')
        value = value.replace(/(\d{2})(\d)/, "($1) $2")
        value = value.replace(/(\d)(\d{4})$/, "$1-$2")
        return value
    }
    // Formata o CPF
    const handleCpf = (event) => {
        let input = event.target
        input.value = formataCpf(input.value)
    }

    function formataCpf(value) {
        return value.replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')
    }
    // Valida o CPF
    function verificarCPF(cpf) {
        if (typeof cpf !== 'string') return false
        cpf = cpf.replace(/[^\d]+/g, '')
        if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false
        cpf = cpf.split('').map(el => +el)
        const rest = (count) => (cpf.slice(0, count - 12)
            .reduce((soma, el, index) => (soma + el * (count - index)), 0) * 10) % 11 % 10
        return rest(10) === cpf[9] && rest(11) === cpf[10]
    }

    function validaCPF() {
        let cpf = document.getElementById('cpf').value;

        if (!verificarCPF(cpf)) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'CPF Inválido'
            })
        }
    }
    // Formata o CEP
    const handleCep = (event) => {
        let input = event.target
        input.value = cepMask(input.value)
    }

    function cepMask(value) {
        if (!value) return ""
        value = value.replace(/\D/g, '')
        value = value.replace(/(\d{5})(\d)/, '$1-$2')
        return value
    }
    // Pega CEP
    const pegaCep = useCallback(async () => {
        try {
            const response = await axios.get(`https://brasilapi.com.br/api/cep/v1/${data.cep}`);
            setEndereco({
                rua: response.data.street,
                bairro: response.data.neighborhood,
                cidade: response.data.city,
                uf: response.data.state
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'CEP Inexistente!'
            })
        }
    }, [data.cep]);


    useEffect(() => {
        if (data.cep === 9) {
            pegaCep();
        };
    }, [data.cep, pegaCep]);

    // Pega o valor digitado no input de alguns fields 
    const handle = e => {
        const newData = { ...data }
        newData[e.target.id] = e.target.value
        setData(newData)
    }
    // Variáveis para mostrar o idSame do paciente que foi criado
    const sucessoRef = useRef();
    const [sucessoMsg, setSucessoMsg] = useState('');
    // Função de post
    const cadastrarPaciente = async (e) => {
        e.preventDefault();
        setShowLoader(true)
        setTimeout(() => setShowLoader(false), 1000)
        // Continuação da gambiarra
        const prateleiraDefault = `Sem Arquivo`;
        try {
            const postaxios = await axiosPrivate.post(process.env.REACT_APP_API_CADPAC,
                JSON.stringify({
                    nome: data.nome,
                    nomeSocial: data.nomeSocial,
                    genero: data.genero,
                    dataNasc: data.dataNasc,
                    cpf: data.cpf,
                    email: data.email,
                    telefone: data.telefone,
                    cep: data.cep,
                    rua: endereco.rua,
                    numero: data.numero,
                    complemento: data.complemento,
                    bairro: endereco.bairro,
                    cidade: endereco.cidade,
                    uf: endereco.uf,
                    prateleira: prateleiraDefault
                })
            );
            console.log(postaxios);
            setData({
                nome: '',
                nomeSocial: '',
                genero: '',
                dataNasc: '',
                cpf: '',
                email: '',
                telefone: '',
                cep: '',
                numero: '',
                complemento: ''
            });
            setEndereco({
                rua: '',
                bairro: '',
                cidade: '',
                uf: ''
            });
            e.target.reset();
            let nomeCriado = (postaxios.data.nome)
            let idSameCriado = (postaxios.data.idSame)
            setSucessoMsg("Paciente " + nomeCriado + " foi salvo com sucesso! Seu ID Same é " + idSameCriado);
            Swal.fire({
                icon: 'success',
                title: 'Paciente Cadastrado',
                showConfirmButton: true,
                text: 'Paciente ' + nomeCriado + ' registrado com SAME ' + idSameCriado
            });
        } catch (err) {
            if (!err?.response) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Falha de comunicação com servidor, Contate seu Administrator.'
                })
            } else if (err.response?.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Você não tem autorização para utilizar esse recurso.'
                })
            } else if (err.response?.status === 404) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Falha de comunicação com servidor, Contate seu Administrator.'
                })
            } else if (err.response?.status === 409) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'CPF já cadastrado, confirme no busca cadastro os dados!'
                })
            }
        }
    }
    return (
        <div className="container-fluid ms-3">
            <h3 className="text-uppercase fw-normal  mt-3 mb-3">Cadastro de Paciente</h3>
            <div className="me-3">
                <form onSubmit={(e) => cadastrarPaciente(e)}>
                    <div className="w-100 d-inline-flex flex-row justify-content-start align-items-start">
                        <div className="form-floating mb-3 me-3 w-50 flex-fill">
                            <input autoFocus onChange={(e) => handle(e)} value={data.nome} type="text" className="form-control w-100" id="nome" autoComplete='off' placeholder="Example input" required />
                            <label htmlFor="floatingInput">Nome</label>
                        </div>
                        <div className="form-floating mb-3 w-50 flex-fill">
                            <input onChange={(e) => handle(e)} value={data.nomeSocial} type="text" className="form-control w-100" id="nomeSocial" autoComplete='off' placeholder="Example input" />
                            <label htmlFor="floatingInput">Nome Social</label>
                        </div>
                    </div>

                    <div className="w-100 d-inline-flex flex-row justify-content-start align-items-start">
                        <div className="form-floating mb-3 me-3 flex-fill">
                            <select onChange={(e) => handle(e)} value={data.genero} className="form-select" id="genero" aria-label="Floating label select example" required>
                                <option></option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                                <option value="Outro">Outro</option>
                            </select>
                            <label htmlFor="floatingSelect">Gênero</label>
                        </div>
                        <div className="form-floating mb-3 me-3 flex-fill">
                            <input onChange={(e) => handle(e)} value={data.dataNasc} type="date" className="form-control" id="dataNasc" placeholder="Example input" required />
                            <label htmlFor="floatingInput">Data de Nascimento</label>
                        </div>
                        <div className="form-floating mb-3 flex-fill">
                            <input onChange={(e) => handle(e)} value={data.cpf} onKeyUpCapture={handleCpf} onBlur={validaCPF} maxLength="14" type="text" className="form-control" id="cpf" placeholder="Example input" required />
                            <label htmlFor="floatingInput">CPF</label>
                        </div>
                    </div>

                    <div className="w-100 d-inline-flex flex-row justify-content-start align-items-start">
                        <div className="form-floating mb-3 me-3 flex-fill">
                            <input onChange={(e) => handle(e)} value={data.email} type="email" className="form-control" id="email" placeholder="Example input" />
                            <label htmlFor="floatingInput">E-mail</label>
                        </div>

                        <div className="form-floating mb-3 flex-fill">
                            <input onChange={(e) => handle(e)} value={data.telefone} type="tel" maxLength="15" onKeyUp={handleTel} className="form-control" id="telefone" placeholder="Example input" required />
                            <label htmlFor="floatingInput">Telefone</label>
                        </div>
                    </div>

                    <div className="w-100 d-inline-flex flex-row justify-content-start align-items-start">
                        <div className="form-floating mb-3 me-3 w-15">
                            <input onChange={(e) => handle(e)} value={data.cep} onKeyUp={handleCep} onBlur={pegaCep} type="text" maxLength="9" className="form-control" id="cep" placeholder="Example input" required />
                            <label htmlFor="floatingInput">CEP</label>
                        </div>
                        <div className="form-floating mb-3 me-3 w-75">
                            <input onChange={(e) => handle(e)} value={endereco.rua} type="text" className="form-control" id="rua" placeholder="Example input" required readOnly />
                            <label htmlFor="floatingInput">Rua</label>
                        </div>
                        <div className="form-floating mb-3 flex-fill">
                            <input onChange={(e) => handle(e)} value={data.numero} type="number" className="form-control" id="numero" placeholder="Example input" required />
                            <label htmlFor="floatingInput">Número</label>
                        </div>
                    </div>


                    <div className="w-100 d-inline-flex flex-row justify-content-start align-items-start">
                        <div className="form-floating mb-3 me-3 w-20">
                            <input onChange={(e) => handle(e)} value={data.complemento} type="text" className="form-control" id="complemento" placeholder="Example input" />
                            <label htmlFor="floatingInput">Complemento </label>
                        </div>
                        <div className="form-floating mb-3 me-3 w-20">
                            <input onChange={(e) => handle(e)} value={endereco.bairro} type="text" className="form-control" id="bairro" placeholder="Example input" required />
                            <label htmlFor="floatingInput">Bairro</label>
                        </div>
                        <div className="form-floating mb-3 me-3 w-40">
                            <input onChange={(e) => handle(e)} value={endereco.cidade} type="text" className="form-control" id="cidade" placeholder="Example input" required />
                            <label htmlFor="floatingInput">Cidade</label>
                        </div>
                        <div className="form-floating mb-3 w-20">
                            <input onChange={(e) => handle(e)} value={endereco.uf} type="text" className="form-control" id="uf" placeholder="Example input" required />
                            <label htmlFor="floatingInput">Estado</label>
                        </div>
                    </div>
                    {/* <button className="">Cadastrar</button> */}
                    <EnviaBT
                        text="Cadastrar"
                        className="btn btn-bscpac btn-lg btn-primary btn-padrao text-uppercase mb-2"
                        loading={showLoader}
                        disabled={showLoader}
                    />                  </form>
                <div className="w-100 d-inline-flex flex-row justify-content-center align-items-center">
                    <span className={sucessoMsg ? "mensagem-sucesso text-uppercase" : ""} aria-live="assertive" ref={sucessoRef}>{sucessoMsg}</span>
                </div>
            </div>
        </div>
    )
}