import { useState, useEffect } from "react";
import { Searcher } from "../components/Searcher";
import { Sidebar } from "../components/Sidebar";
import { ListaConsultas } from "../components/ListaConsultas";
import { ListaDiagnostico } from "../components/ListaDiagnosticos";
import { ListaTratamientos } from "../components/ListaTratamiento";

export default function Tratamientos() {
  //Métodos de búsqueda
  const [from, setFrom] = useState(new Date("December 1, 1900 03:24:00"));
  const [to, setTo] = useState(new Date(Date.now() + 3600 * 1000 * 24));
  const [search, setSearch] = useState("");

  return (
    <>
      <Sidebar currentView="tratamiento" />
      <div className="ml-20 md:ml-50 mt-0 h-full p-10">
        <Searcher
          onChangeFrom={(e) => setFrom(new Date(e.target.value))}
          onChangeTo={(e) => setTo(new Date(e.target.value))}
          onChangeSearch={setSearch}
        />
        <ListaTratamientos
          search={search}
          from={from}
          to={to}
          fetchFunction={
            //@ts-ignore
            window.tratamiento.getTratamientosByPacienteAndDate
          }
        />
      </div>
    </>
  );
}
