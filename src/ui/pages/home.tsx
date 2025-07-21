import { useState, useEffect } from "react";
import { Searcher } from "../components/layout/Searcher";
import { Sidebar } from "../components/layout/Sidebar";
import { ListaConsultas } from "../components/ListarEntidades/ListaConsultas";
import { ListaPacientes } from "../components/ListarEntidades/ListaPacientes";

export function Home() {
  //Métodos de búsqueda
  const [from, setFrom] = useState(new Date("December 1, 1900 03:24:00"));
  const [to, setTo] = useState(new Date(Date.now() + 3600 * 1000 * 24));
  const [search, setSearch] = useState("");

  return (
    <div className="p-10">
      <h1 className="text-center text-3xl mb-5">Seleccione un paciente</h1>
      <Searcher
        onChangeFrom={(e) => setFrom(new Date(e.target.value))}
        onChangeTo={(e) => setTo(new Date(e.target.value))}
        onChangeSearch={setSearch}
      />
      <ListaPacientes
        path="/consultas"
        search={search}
        from={from}
        to={to}
        fetchFunction={
          //@ts-ignore
          window.paciente.getPacienteByBirth
        }
      />
    </div>
  );
}
