import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, SquarePlus } from "lucide-react";
import { HCardView } from "../ViewCards/HCardView";
import { CreateTratamientoModal } from "../../FormsModal/Tratamientos/CreateTratamientoModal";

type FetchFunction = (id: string) => Promise<
  {
    id: string;
    tratment: string;
    notes: string;
    prescription: string;
    description: string;
    date: string;
  }[]
>;

type ListaAntecedentesProps = {
  id: any;
  type: string;
  typeSingular: string;
  search: string;
  fetchFunction: FetchFunction;
};

export function ViewListaTratamientos({
  id,
  type,
  typeSingular = "vacuna",
  fetchFunction,
}: ListaAntecedentesProps) {
  const [data, setData] = useState<
    {
      id: string;
      tratment: string;
      notes: string;
      date: string;
      prescription: string;
    }[]
  >([]);

  const [filteredData, setFilteredData] = useState<typeof data>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isOpenModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        //@ts-ignore
        const dfetch = await fetchFunction(id);
        setData(dfetch);
        setFilteredData(dfetch);
      } catch (error) {
        console.error("Error al obtener consultas:", error);
      }
    };
    setRefresh(false);
    fetchData();
  }, [id, refresh]);

  return (
    <>
      <CreateTratamientoModal
        id={id}
        isOpen={isOpenModal}
        onConfirm={
          //@ts-ignore
          window.tratamiento.createTratamiento
        }
        onCancel={() => setOpenModal(false)}
        refresh={() => setRefresh(true)}
      />
      <div className="flex flex-col pt-5">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={` px-4 py-2 bg-teal-400 font-semibold text-white flex justify-between 
        rounded-t hover:bg-teal-500 transition hover:cursor-pointer
        ${isOpen ? `` : `rounded-b`}`}
        >
          {isOpen ? `Ocultar ${type}` : `Mostrar ${type}`}
          <ChevronDown className={isOpen ? `hidden` : ``} />
          <ChevronUp className={isOpen ? `` : `hidden`} />
        </button>

        {isOpen && (
          <div className="flex flex-col shadow-md">
            {filteredData.map((item) => (
              <HCardView
                type="tratamiento"
                prescription={item.prescription}
                funcion={
                  //@ts-ignore
                  window.tratamiento.deleteTratamiento
                }
                refresh={() => setRefresh(true)}
                key={item.id}
                title={item.tratment}
                notes={item.notes}
                date={item.date}
                id={item.id}
              />
            ))}
            <div
              className="flex justify-center bg-sky-500 hover:bg-blue-500 rounded-b font-semibold text-white inset-shadow-xs p-2 shadow-xs hover:cursor-pointer"
              onClick={() => setOpenModal(true)}
            >
              <p className="pr-2">Nuevo {typeSingular}</p> <SquarePlus />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
