import { useState } from "react";
import { Searcher } from "../../components/Layout/Searcher";
import { ListaPacientes } from "../../components/ListarEntidades/ListaPacientes";
import { SidebarMenu } from "../../components/Layout/SidebarMenu";
import { NewPacienteForm } from "../../components/FormsModal/NewPacienteForm";

export function Home() {
  //Métodos de búsqueda
  const [from, setFrom] = useState(new Date("December 1, 1900 03:24:00"));
  const [to, setTo] = useState(new Date("December 1, 3900 03:24:00"));
  const [search, setSearch] = useState("");

  return (
    <>
      <SidebarMenu currentView="pacientes" />
      <div className="ml-20 lg:ml-50 mt-0 h-full p-10">
        <NewPacienteForm />
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
    </>
  );
}
