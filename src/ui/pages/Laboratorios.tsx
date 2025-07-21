import { useState } from "react";
import { Searcher } from "../components/layout/Searcher";
import { Sidebar } from "../components/layout/Sidebar";
import { ListaLaboratorios } from "../components/ListarEntidades/ListaLaboratorios";

export default function Laboratorios() {
  //Métodos de búsqueda
  const [from, setFrom] = useState(new Date("December 1, 1900 03:24:00"));
  const [to, setTo] = useState(new Date(Date.now() + 3600 * 1000 * 24));
  const [search, setSearch] = useState("");

  return (
    <>
      <Sidebar currentView="laboratorio" />
      <div className="ml-20 lg:ml-50 mt-0 h-full p-10">
        <Searcher
          onChangeFrom={(e) => setFrom(new Date(e.target.value))}
          onChangeTo={(e) => setTo(new Date(e.target.value))}
          onChangeSearch={setSearch}
        />
        <ListaLaboratorios
          path="/controles"
          search={search}
          from={from}
          to={to}
          fetchFunction={
            //@ts-ignore
            window.exLaboratorio.getLaboratoriosByPacienteAndDate
          }
        />
      </div>
    </>
  );
}
