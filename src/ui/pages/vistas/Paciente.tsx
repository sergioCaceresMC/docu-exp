import { Sidebar } from "../../components/Layout/Sidebar";
import { ViewPaciente } from "../../components/ViewData/ViewPaciente";
import { ListaAntecedentes } from "../../components/ViewData/ViewListas/ListaAntecedente";

export default function Paciente() {
  return (
    <>
      <Sidebar currentView="paciente" />
      <div className="ml-20 lg:ml-50 mt-0 h-full p-10">
        <ViewPaciente />
        <ListaAntecedentes
          delFunction={
            //@ts-ignore
            window.antecedentes.deleteVacunaById
          }
          type={"vacunas"}
          typeSingular="vacuna"
          path={"/vacunas"}
          fetchFunction={
            //@ts-ignore
            window.antecedentes.getVacunasByPaciente
          }
        />
        <ListaAntecedentes
          delFunction={
            //@ts-ignore
            window.antecedentes.deleteAlergiaById
          }
          type={"alergias"}
          typeSingular="alergia"
          path={"/alergias"}
          fetchFunction={
            //@ts-ignore
            window.antecedentes.getAlergiasByPaciente
          }
        />
        <ListaAntecedentes
          delFunction={
            //@ts-ignore
            window.antecedentes.deleteCirugiaById
          }
          type={"cirugías"}
          typeSingular="cirugía"
          path={"/cirugia"}
          fetchFunction={
            //@ts-ignore
            window.antecedentes.getCirugiasPaciente
          }
        />
        <ListaAntecedentes
          delFunction={
            //@ts-ignore
            window.antecedentes.deleteEnfermedadById
          }
          type={"enfermedades"}
          typeSingular="enfermedad"
          path={"/enfermedades"}
          fetchFunction={
            //@ts-ignore
            window.antecedentes.getEnfermedadesPaciente
          }
        />
      </div>
    </>
  );
}
