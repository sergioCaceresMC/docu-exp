import { useEffect, useState } from "react";
import { HCardAntecedente } from "../../Cards/HCardAntecedente";
import { ChevronDown, ChevronUp, SquarePlus } from "lucide-react";
import { CreateAntecedenteModal } from "../../FormsModal/Antecedentes/CreateAntecedenteModal";

type FetchFunction = (id: string) => Promise<
  {
    id: string;
    name: string;
    description: string;
    date: string;
  }[]
>;

type ListaAntecedentesProps = {
  type: string;
  typeSingular: string;
  path: string;
  createFunction: (id: string, data: any) => void;
  updateFunction: (id: string, data: any) => void;
  fetchFunction: FetchFunction;
  delFunction: any;
};

export function ListaAntecedentes({
  type,
  typeSingular = "vacuna",
  createFunction,
  updateFunction,
  fetchFunction,
  delFunction,
}: ListaAntecedentesProps) {
  const [data, setData] = useState<
    { id: string; name: string; description: string; date: string }[]
  >([]);

  const [isOpen, setIsOpen] = useState(false);
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const paciente = sessionStorage.getItem("id_paciente");

  useEffect(() => {
    const fetchData = async () => {
      if (!paciente) return;
      try {
        const dfetch = await fetchFunction(paciente);
        setData(dfetch);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };
    setRefresh(false);
    fetchData();
  }, [paciente, modalCreateOpen, refresh]);

  return (
    <div className="flex flex-col pt-5">
      {typeSingular !== "enfermedad" ? (
        <CreateAntecedenteModal
          type={typeSingular}
          isOpen={modalCreateOpen}
          onConfirm={createFunction}
          onCancel={() => setModalCreateOpen(false)}
        />
      ) : (
        <CreateAntecedenteModal
          type={"enfermedad"}
          isOpen={modalCreateOpen}
          onConfirm={createFunction}
          onCancel={() => setModalCreateOpen(false)}
        />
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-2 bg-teal-400 font-semibold text-white flex justify-between 
        rounded-t hover:bg-teal-500 transition hover:cursor-pointer
        ${isOpen ? "" : "rounded-b"}`}
      >
        {isOpen ? `Ocultar ${type}` : `Mostrar ${type}`}
        <ChevronDown className={!isOpen ? "" : "hidden"} />
        <ChevronUp className={isOpen ? "" : "hidden"} />
      </button>

      {isOpen && (
        <div className="flex flex-col shadow-md">
          {data.map((item) => (
            <HCardAntecedente
              refresh={() => setRefresh(true)}
              updateFunction={updateFunction}
              delFunction={delFunction}
              type={typeSingular}
              key={item.id}
              fecha={item.date}
              description={item.description}
              name={item.name}
              id={item.id}
            />
          ))}
          <div
            className="flex justify-center bg-sky-500 hover:bg-blue-500 rounded-b font-semibold text-white inset-shadow-xs p-2 shadow-xs hover:cursor-pointer"
            onClick={() => {
              setModalCreateOpen(true);
            }}
          >
            <p className="pr-2">Nueva {typeSingular}</p> <SquarePlus />
          </div>
        </div>
      )}
    </div>
  );
}
