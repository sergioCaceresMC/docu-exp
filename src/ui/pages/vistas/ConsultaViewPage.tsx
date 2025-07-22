import { useParams } from "react-router-dom";
import { Sidebar } from "../../components/layout/Sidebar";
import { ViewListaDiagnosticos } from "../../components/ViewData/ViewListaDiagnosticos";
import { ViewListaTratamientos } from "../../components/ViewData/ViewListaTratamientos";
import { ViewListaControles } from "../../components/ViewData/ViewListaControles";
import { ViewConsulta } from "../../components/ViewData/ViewConsulta";

export default function ConsultaViewPage() {
  const { id } = useParams();
  /*
  const [dataConsulta, setDataConsulta] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      //@ts-ignore
      const data_paciente = await window.consulta.getConsultaById(id);
      setDataConsulta(data_paciente);
    };

    if (id) {
      fetchData();
    }
  }, [id]);*/

  return (
    <>
      <Sidebar currentView="consulta" />
      <div className="ml-20 lg:ml-50 mt-0 h-full p-10">
        <ViewConsulta id={id} />
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
      </div>
    </>
  );
}
