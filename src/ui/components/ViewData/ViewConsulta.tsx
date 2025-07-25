import { SquarePen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ConfirmModal } from "../Alertas/ConfirmModal";
import Alert from "../Alertas/AlertProp";
import { useNavigate } from "react-router-dom";
import { EditConsultaModal } from "../FormsModal/Consulta/EditConsultaModal";

type PacienteData = {
  id: string;
  reason: string;
  type: string;
  date: Date;
  content: string;
};

export function ViewConsulta({ id }: { id: any }) {
  const navigate = useNavigate();

  const [data, setData] = useState<PacienteData>({
    id: "",
    reason: "",
    type: "",
    date: new Date(),
    content: "",
  });

  const safeFecha =
    typeof data.date === "string"
      ? data.date
      : //@ts-ignore
      data.date instanceof Date
      ? //@ts-ignore
        data.date.toISOString().split("T")[0]
      : "";

  const [aa, mm, dd] = safeFecha.split("-");
  const formatted = `${dd}/${mm}/${aa?.slice(-2)}`;

  const [refresh, setRefresh] = useState(false);

  const [alerta, setAlerta] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);
  const [modalDelOpen, setModalDelOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);

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
  }, [id, refresh]);

  async function delConsulta() {
    //@ts-ignore
    const res = await window.consulta.deleteConsultaById(id);

    if (res == 0) {
      setAlerta({
        type: "error",
        message: "Error al eliminar la consulta",
      });
      return;
    }
    setAlerta({
      type: "success",
      message: "Consulta eliminada exitosamente",
    });
    navigate("/consultas");
  }

  return (
    <>
      {alerta && (
        <Alert
          type={alerta.type}
          message={alerta.message}
          onClose={() => setAlerta(null)}
        />
      )}

      <ConfirmModal
        isOpen={modalDelOpen}
        message={`Se borrará la consulta "${data.reason}" y las referencias indicadas, esto incluye controles, diagnosticos y tratamientos pudiendo incurrir en una auditoría legal ¿Desea continuar?`}
        onConfirm={delConsulta}
        onCancel={() => setModalDelOpen(false)}
      />

      <EditConsultaModal
        id={data.id}
        reason={data.reason}
        type={data.type}
        date={data.date}
        content={data.content}
        isOpen={modalEditOpen}
        refresh={() => setRefresh(true)}
        onConfirm={
          //@ts-ignore
          window.consulta.updateConsultaById
        }
        onCancel={() => setModalEditOpen(false)}
      />

      <div className="p-5 rounded-t-2xl bg-teal-500">
        <h1 className="text-3xl font-semibold text-white">
          {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
        </h1>
      </div>
      <div className="p-5 inset-shadow-2xs border-2 border-teal-500 ">
        <div className="flex flex-col-reverse lg:flex-row lg:gap-10">
          <div className="flex flex-1 flex-col mb-3 gap-2">
            <label className="text-gray-500 text-lg">Motivo de consulta:</label>
            <p className="text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2">
              {data.reason}
            </p>
          </div>
          <div className="flex flex-col mb-3 pr-5 gap-2">
            <label className="text-gray-500 text-lg">Fecha de consulta:</label>
            <p className="text-lg ">{formatted}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-gray-500 text-lg pl-2">
            Notas de consulta:
          </label>
          <p className="text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4">
            {data.content}
          </p>
        </div>

        <div className=" pt-8 flex whitespace-nowrap">
          <button
            onClick={() => setModalEditOpen(true)}
            className="px-3 py-1 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-500 transition duration-150 ease-in-out hover:cursor-pointer flex"
          >
            <SquarePen /> <span className="pl-2">Editar {data.type}</span>
          </button>
          <button
            onClick={() => setModalDelOpen(true)}
            className="ml-2 px-3 py-1 font-medium text-white bg-[#ff0000] rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-[#ff0000] transition duration-150 ease-in-out flex hover:cursor-pointer"
          >
            <Trash2 /> <span className="pl-2">Borrar {data.type}</span>
          </button>
        </div>
      </div>
    </>
  );
}
