import { Sidebar } from "../components/layout/Sidebar";
import { ViewPaciente } from "../components/ViewData/ViewPaciente";
import { ListaAntecedentes } from "../components/ListarEntidades/ListaAntecedente";

export default function Paciente() {
  return (
    <>
      <Sidebar currentView="paciente" />
      <div className="ml-20 lg:ml-50 mt-0 h-full p-10">
        <ViewPaciente />
        <ListaAntecedentes
          type={"vacunas"}
          typeSingular="vacuna"
          path={"/vacunas"}
          search={""}
          fetchFunction={
            //@ts-ignore
            window.antecedentes.getVacunasByPaciente
          }
        />
        <ListaAntecedentes
          type={"alergias"}
          typeSingular="alergia"
          path={"/alergias"}
          search={""}
          fetchFunction={
            //@ts-ignore
            window.antecedentes.getAlergiasByPaciente
          }
        />
        <ListaAntecedentes
          type={"cirugías"}
          typeSingular="cirugía"
          path={"/cirugia"}
          search={""}
          fetchFunction={
            //@ts-ignore
            window.antecedentes.getCirugiasPaciente
          }
        />
        <ListaAntecedentes
          type={"enfermedades"}
          typeSingular="enfermedad"
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
