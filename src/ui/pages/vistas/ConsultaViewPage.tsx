import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "../../components/layout/Sidebar";
import { ViewListaDiagnosticos } from "../../components/ViewData/ViewListaDiagnosticos";
import { ViewListaTratamientos } from "../../components/ViewData/ViewListaTratamientos";
import { ViewListaControles } from "../../components/ViewData/ViewListaControles";
import { ViewConsulta } from "../../components/ViewData/ViewConsulta";
import { ViewExFisico } from "../../components/ViewData/ViewExFisico";
import { useEffect, useState } from "react";
import { Stethoscope } from "lucide-react";

type PacienteData = {
  id: string;
  reason: string;
  type: string;
  date: Date;
  content: string;
  parentConsultaId: string;
};

export default function ConsultaViewPage() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [data, setData] = useState<PacienteData>({
    id: "",
    reason: "",
    type: "",
    date: new Date(),
    content: "",
    parentConsultaId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        //@ts-ignore
        const dfetch = await window.consulta.getConsultaById(id);

        setData(dfetch);
      } catch (error) {
        console.error("Error al obtener datos del paciente:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <Sidebar currentView={data.type} />
      <div className="ml-20 lg:ml-50 mt-0 h-full p-10">
        <ViewConsulta id={id} />
        <ViewExFisico id={id} />
        <ViewListaDiagnosticos
          id={id}
          path="/controles"
          search={""}
          fetchFunction={
            //@ts-ignore
            window.diagnostico.getDiagnosticoByConsulta
          }
          type={"diagnosticos"}
          typeSingular={"diagnostico"}
        />
        <ViewListaTratamientos
          id={id}
          path="/controles"
          search={""}
          fetchFunction={
            //@ts-ignore
            window.tratamiento.getTratamientosByConsulta
          }
          type={"tratamientos"}
          typeSingular={"tratammiento"}
        />
        {data.type === "consulta" ? (
          <ViewListaControles
            path="/consultas"
            id={id}
            fetchFunction={
              //@ts-ignore
              window.consulta.getControlesByConsulta
            }
            search={""}
            type={"controles"}
            typeSingular={"control"}
          />
        ) : (
          <button
            onClick={() => {
              navigate(`/consultas/${data.parentConsultaId}`);
            }}
            className="px-2 py-2 mt-5 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-500 transition duration-150 ease-in-out hover:cursor-pointer flex"
          >
            <Stethoscope /> <span className="pl-2">Ir a consulta</span>
          </button>
        )}
      </div>
    </>
  );
}
