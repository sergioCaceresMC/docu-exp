import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, SquarePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { HCardView } from "../ViewCards/HCardView";

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
  path: string;
  search: string;
  fetchFunction: FetchFunction;
};

export function ViewListaTratamientos({
  id,
  type,
  typeSingular = "vacuna",
  search,
  path,
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

  const navigate = useNavigate();
  const [filteredData, setFilteredData] = useState<typeof data>([]);
  const [isOpen, setIsOpen] = useState(false);

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

    fetchData();
  }, [id]);

  return (
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
              prescription={item.prescription}
              path={path}
              key={item.id}
              title={item.tratment}
              notes={item.notes}
              date={item.date}
              id={item.id}
            />
          ))}
          <div
            className="flex justify-center bg-sky-500 hover:bg-blue-500 rounded-b font-semibold text-white inset-shadow-xs p-2 shadow-xs hover:cursor-pointer"
            onClick={() => {
              navigate(`${path}/new`);
            }}
          >
            <p className="pr-2">Nuevo {typeSingular}</p> <SquarePlus />
          </div>
        </div>
      )}
    </div>
  );
}
