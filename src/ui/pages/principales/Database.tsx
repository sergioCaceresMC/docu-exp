import { useState } from "react";
import { Searcher } from "../../components/layout/Searcher";
import { ListaPacientes } from "../../components/ListarEntidades/ListaPacientes";
import { SidebarMenu } from "../../components/layout/SidebarMenu";
import { NewPacienteForm } from "../../components/Forms/NewPacienteForm";

export function DataBase() {
  //Métodos de búsqueda
  const [from, setFrom] = useState(new Date("December 1, 1900 03:24:00"));
  const [to, setTo] = useState(new Date("December 1, 3900 03:24:00"));
  const [search, setSearch] = useState("");

  return (
    <>
      <SidebarMenu currentView="database" />
      <div className="ml-20 lg:ml-50 mt-0 h-full p-10">
        <h1 className="text-2xl">Ajustes de la base de datos</h1>
      </div>
    </>
  );
}
