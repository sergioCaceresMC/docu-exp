import { useParams } from "react-router-dom";
import { Sidebar } from "../../components/Layout/Sidebar";
import { ViewLaboratorio } from "../../components/ViewData/ViewLaboratorio";

export default function LaboratorioViewPage() {
  const { id } = useParams();

  return (
    <>
      <Sidebar currentView="laboratorio" />
      <div className="ml-20 lg:ml-50 mt-0 h-full p-10">
        <ViewLaboratorio id={id} />
      </div>
    </>
  );
}
