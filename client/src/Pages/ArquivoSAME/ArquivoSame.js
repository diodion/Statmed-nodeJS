import React, { useState, useEffect } from 'react'
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import axios from '../../Api/axios';

export default function ArquivoSame() {
  useEffect(() => {
    document.title = 'Statmed - Arquivo Médico';
  }, []);

  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  useEffect(() => {
    let carregado = true;
    const controller = new AbortController();

    const pegaCid = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_BUSPACALL, {
          signal: controller.signal
        });
        carregado && setData(response.data);
      } catch (err) {

      }
    }

    pegaCid();

    return () => {
      carregado = false;
      controller.abort();
    }
  }, [])


  return (
    <div className="container-fluid ms-3 me-3">
      <h3 className="text-uppercase fw-normal mt-3 mb-3">Pesquisa de Arquivo</h3>
      <div className="form-floating me-3 mt-3 w-100">
        <input onInput={(e) =>
          setFilters({
            global: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS },
          })}
          type="text" className="form-control me-3 w-100" id="cid10" autoComplete='off' placeholder="Example input" />
        <label htmlFor="floatingInput">Pesquisar</label>
      </div>
      <div className="mt-3">
        <DataTable
          value={data}
          size={'small'}
          stripedRows
          filters={filters}
          paginator
          rows={15}
        >
          <Column field="idSame" header="SAME" sortable />
          <Column field="nome" header="Nome" sortable />
          <Column field="cpf" header="CPF" sortable />
          <Column field="dataNasc" header="Data Nasc." sortable />
          <Column field="prateleira" header="Prateleira" sortable />

        </DataTable>
      </div>
    </div>
  )
}