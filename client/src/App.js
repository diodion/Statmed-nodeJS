import 'bootstrap/dist/js/bootstrap.min.js'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import CargoRota from './Components/CargoRota'
import LoginPersistente from './Components/LoginPersistente'
import Usuarios from './Components/Usuarios'
import Cargos from './Components/Variaveis/Cargos'
import Layout from './Layout'
import Anamnese from './Pages/Anamnese/Anamnese'
import ArquivoSame from './Pages/ArquivoSAME/ArquivoSame'
import Atendimento from './Pages/Atendimento/Atendimento'
import Atestado from './Pages/Atestado/Atestado'
import AttPaciente from './Pages/AtualizarPaciente/AtualizarPaciente'
import CadPaciente from './Pages/CadastrarPaciente/CadPaciente'
import ConsultaAtendimento from './Pages/ConsultarAtendimento/ConsultarAtendimento'
import Dashboard from './Pages/Dashboard/Dashboard'
import Encaminhamento from './Pages/Encaminhamento/Encaminhamento'
import Estatisticas from './Pages/Estatisticas/Estatisticas'
import HistoricoHospitalar from './Pages/HistoricoHospitalar/HistoricoHospitalar'
import LoginPage from './Pages/Login/Login'
import Proibido from './Pages/Proibido/Proibido'
import Receita from './Pages/Receita/Receita'
import RelatorioAdm from './Pages/RelatorioAdm/RelatorioAdm'
import RelatoriosMedicos from './Pages/RelatoriosMedicos/RelatoriosMedicos'

function App() {
    return (
        <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route element={<LoginPersistente />}>
                <Route element={<Layout />}>
                    {/* Verifica se ta logado */}
                    {/* <Route element={<CargoRota />}> */}
                    <Route path="/proibido" element={<Proibido />} />
                    <Route element={<CargoRota cargosPermitidos={[Cargos.usuario]} />}>
                        {/* Rotas permitidas a todos */}
                        <Route path="/inicio" element={<Dashboard />} />
                        <Route
                            path="/histhospitalar"
                            element={<HistoricoHospitalar />}
                        />
                        <Route path="/same" element={<ArquivoSame />} />
                        <Route
                            path="/consultaAtd"
                            element={<ConsultaAtendimento />}
                        />
                        {/* Somente Administrativo/Recepcionista */}
                        <Route
                            element={
                                <CargoRota
                                    cargosPermitidos={[
                                        Cargos.recepcionista,
                                        Cargos.administrativo,
                                        Cargos.ti,
                                        Cargos.superuser,
                                        Cargos.gerente_administrativo,
                                    ]}
                                />
                            }
                        >
                            <Route
                                path="/pcadastro"
                                element={<CadPaciente />}
                            />
                            <Route
                                path="/patendimento"
                                element={<Atendimento />}
                            />
                            <Route
                                path="/estatisticas"
                                element={<Estatisticas />}
                            />
                            <Route
                                path="/relatorioadm"
                                element={<RelatorioAdm />}
                            />
                            <Route
                                path="/atpaciente"
                                element={<AttPaciente />}
                            />
                        </Route>
                        {/* Somente Médicos */}
                        <Route
                            element={
                                <CargoRota
                                    cargosPermitidos={[
                                        Cargos.medico,
                                        Cargos.superuser,
                                    ]}
                                />
                            }
                        >
                            <Route path="/anamnese" element={<Anamnese />} />
                            <Route
                                path="/relatoriomedico"
                                element={<RelatoriosMedicos />}
                            />
                            <Route
                                path="/encaminhamento"
                                element={<Encaminhamento />}
                            />
                            <Route path="/atestado" element={<Atestado />} />
                            <Route path="/receita" element={<Receita />} />
                        </Route>
                        <Route
                            element={
                                <CargoRota
                                    cargosPermitidos={[
                                        Cargos.superuser,
                                    ]}
                                />
                            }
                        >
                        <Route path="/usuarios" element={<Usuarios />} />
                        </Route>
                    </Route>
                </Route>
            </Route>
        </Routes>
    )
}

export default App
