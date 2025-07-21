import { useEffect, useState } from "react";
import { HCardAntecedente } from "../Cards/HCardAntecedente";
import { ChevronDown, ChevronUp } from "lucide-react";

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
  path: string;
  search: string;
  fetchFunction: FetchFunction;
};

export function ListaAntecedentes({
  type,
  search,
  path,
  fetchFunction,
}: ListaAntecedentesProps) {
  const [data, setData] = useState<
    { id: string; name: string; description: string; date: string }[]
  >([]);

  const [filteredData, setFilteredData] = useState<typeof data>([]);
  const [isOpen, setIsOpen] = useState(false);

  const paciente = sessionStorage.getItem("id_paciente");

  useEffect(() => {
    const fetchData = async () => {
      if (!paciente) return;
      try {
        //@ts-ignore
        const dfetch = await fetchFunction(paciente);
        setData(dfetch);
        setFilteredData(dfetch);
      } catch (error) {
        console.error("Error al obtener consultas:", error);
      }
    };

    fetchData();
  }, [paciente]);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(lowerSearch)
    );
    setFilteredData(filtered);
  }, [search, data]);

  return (
    <div className="flex flex-col pt-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={` px-4 py-2 bg-green-600 text-white flex justify-between 
        rounded-t hover:bg-green-700 transition
        ${isOpen ? `` : `rounded-b`}`}
      >
        {isOpen ? `Ocultar ${type}` : `Mostrar ${type}`}
        <ChevronDown className={isOpen ? `hidden` : ``} />
        <ChevronUp className={isOpen ? `` : `hidden`} />
      </button>

      {isOpen && (
        <div className="flex flex-col">
          {filteredData.map((item) => (
            <HCardAntecedente
              path={path}
              key={item.id}
              fecha={item.date}
              description={item.description}
              name={item.name}
              id={item.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
