import { ChevronDown, ChevronUp, SquarePen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { EditExFisicoModal } from "../FormsModal/Consulta/EditExamenFisicoModal";

type PacienteData = {
  arterialPressure: string;
  cardiacFrecuency: number;
  respiratorRate: number;
  weight: number;
  height: number;
  temperature: number;
  abdominalcircunference: number;
  oxygensaturation: number;
  consultaId: string;
  id: "";
};

export function ViewExFisico({ id }: { id: any }) {
  const [data, setData] = useState<PacienteData>({
    arterialPressure: "--/--",
    cardiacFrecuency: 0,
    respiratorRate: 0,
    weight: 0,
    height: 0,
    temperature: 0,
    abdominalcircunference: 0,
    oxygensaturation: 0,
    consultaId: "",
    id: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isOpenModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        //@ts-ignore
        const dfetch = await window.exFisico.getExFisicoByConsulta(id);
        if (!dfetch) throw new Error("No hay datos");

        setData(dfetch);
      } catch (error) {
        setData({
          arterialPressure: "--/--",
          cardiacFrecuency: 0,
          respiratorRate: 0,
          weight: 0,
          height: 0,
          temperature: 0,
          abdominalcircunference: 0,
          oxygensaturation: 0,
          consultaId: "",
          id: "",
        });
        console.error("Error al obtener datos del paciente:", error);
      }
    };
    setRefresh(false);
    fetchData();
  }, [id, refresh]);

  return (
    <>
      <EditExFisicoModal
        data={{
          arterialPressure: data.arterialPressure,
          cardiacFrecuency: data.cardiacFrecuency,
          respiratorRate: data.respiratorRate,
          weight: data.weight,
          height: data.height,
          temperature: data.temperature,
          abdominalcircunference: data.abdominalcircunference,
          oxygensaturation: data.oxygensaturation,
        }}
        id={data.id}
        refresh={() => setRefresh(true)}
        isOpen={isOpenModal}
        onConfirm={
          //@ts-ignore
          window.exFisico.updateExFisicoByConsulta
        }
        onCancel={() => setOpenModal(false)}
      />
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 px-5 bg-teal-500 text-white flex items-center justify-between cursor-pointer ${
          isOpen ? `` : `rounded-b`
        }`}
      >
        <h1 className="text-lg font-semibold text-white">Examen físco</h1>
        <ChevronDown className={isOpen ? `hidden` : ``} />
        <ChevronUp className={isOpen ? `` : `hidden`} />
      </div>
      <div
        className={`p-5 rounded-b-2xl inset-shadow-2xs border-2 border-teal-500 ${
          isOpen ? `` : `hidden`
        } `}
      >
        <table className="min-w-full border border-teal-600 overflow-hidden">
          <thead className="bg-teal-600 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Parámetro</th>
              <th className="px-4 py-2 text-left">Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-teal-600">
              <td className="px-4 py-2">Presión arterial</td>
              <td className="px-4 py-2">{data.arterialPressure || "--"}</td>
            </tr>
            <tr className="border-t border-teal-600">
              <td className="px-4 py-2">Frecuencia cardíaca</td>
              <td className="px-4 py-2">{data.cardiacFrecuency || "--"} bpm</td>
            </tr>
            <tr className="border-t border-teal-600">
              <td className="px-4 py-2">Frecuencia respiratoria</td>
              <td className="px-4 py-2">{data.respiratorRate || "--"} rpm</td>
            </tr>
            <tr className="border-t border-teal-600">
              <td className="px-4 py-2">Peso</td>
              <td className="px-4 py-2">{data.weight || "--"} kg</td>
            </tr>
            <tr className="border-t border-teal-600">
              <td className="px-4 py-2">Estatura</td>
              <td className="px-4 py-2">{data.height || "--"} cm</td>
            </tr>
            <tr className="border-t border-teal-600">
              <td className="px-4 py-2">Temperatura</td>
              <td className="px-4 py-2">{data.temperature || "--"} °C</td>
            </tr>
            <tr className="border-t border-teal-600">
              <td className="px-4 py-2">Circunferencia abdominal</td>
              <td className="px-4 py-2">
                {data.abdominalcircunference || "--"} cm
              </td>
            </tr>
            <tr className="border-t border-teal-600">
              <td className="px-4 py-2">Saturación de oxígeno</td>
              <td className="px-4 py-2">{data.oxygensaturation || "--"} %</td>
            </tr>
          </tbody>
        </table>

        <div className=" pt-8 flex whitespace-nowrap">
          <button
            onClick={() => setOpenModal(true)}
            className="px-3 py-1 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-500 transition duration-150 ease-in-out hover:cursor-pointer flex"
          >
            <SquarePen /> <span className="pl-2">Editar</span>
          </button>
        </div>
      </div>
    </>
  );
}
