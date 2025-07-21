import { useState, useEffect } from "react";
import { Sidebar } from "../components/layout/Sidebar";
import { ViewPaciente } from "../components/ViewData/ViewPaciente";
import { ListaAntecedentes } from "../components/ListarEntidades/ListaAntecedente";

export default function Paciente() {
  //Métodos de búsqueda
  const [from, setFrom] = useState(new Date("December 1, 1900 03:24:00"));
  const [to, setTo] = useState(new Date(Date.now() + 3600 * 1000 * 24));
  const [search, setSearch] = useState("");

  return (
    <>
      <Sidebar currentView="paciente" />
      <div className="ml-20 lg:ml-50 mt-0 h-full p-10">
        <ViewPaciente />
        <ListaAntecedentes
          type={"vacunas"}
          path={"/vacunas"}
          search={""}
          fetchFunction={
            //@ts-ignore
            window.antecedentes.getVacunasByPaciente
          }
        />
        <ListaAntecedentes
          type={"alergias"}
          path={"/alergias"}
          search={""}
          fetchFunction={
            //@ts-ignore
            window.antecedentes.getAlergiasByPaciente
          }
        />
        <ListaAntecedentes
          type={"cirugías"}
          path={"/cirugia"}
          search={""}
          fetchFunction={
            //@ts-ignore
            window.antecedentes.getCirugiasPaciente
          }
        />
        <ListaAntecedentes
          type={"enfermedades"}
          path={"/enfermedades"}
          search={""}
          fetchFunction={
            //@ts-ignore
            window.antecedentes.getEnfermedadesPaciente
          }
        />
      </div>
    </>
  );
}
