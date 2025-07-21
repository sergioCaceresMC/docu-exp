import { useEffect, useState } from "react";
import { HCard } from "../Cards/HCard";
import { HCardPaciente } from "../Cards/HCardPaciente";

type FetchFunction = (
  from: Date,
  to: Date
) => Promise<
  {
    id: string;
    name: string;
    dui: string;
    birthday: string;
  }[]
>;

type ListaConsultasProps = {
  path: string;
  search: string;
  from: Date;
  to: Date;
  fetchFunction: FetchFunction;
};

export function ListaPacientes({
  search,
  from,
  to,
  path,
  fetchFunction,
}: ListaConsultasProps) {
  const [data, setData] = useState<
    { id: string; name: string; dui: string; birthday: string }[]
  >([]);

  const [filteredData, setFilteredData] = useState<
    { id: string; name: string; dui: string; birthday: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //@ts-ignore
        const dfetch = await fetchFunction(from, to);
        setData(dfetch);
        setFilteredData(dfetch); // Inicialmente sin filtro
      } catch (error) {
        console.error("Error al obtener consultas:", error);
      }
    };

    fetchData();
  }, [from, to]);

  // Filtrar cuando cambia `search`
  useEffect(() => {
    const lowerSearch = search.toLowerCase();

    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerSearch) ||
        item.dui.toLowerCase().includes(lowerSearch)
    );

    setFilteredData(filtered);
  }, [search, data]);

  return (
    <div className="flex flex-col shadow-md">
      <div className="bg-green-600 text-white font-semibold flex rounded-t-xl">
        <p className="w-50 md:w-80 px-6 py-2 whitespace-nowrap overflow-hidden text-ellipsis">
          Nombre
        </p>
        <p className="flex-1 px-6 py-2 whitespace-nowrap overflow-hidden text-ellipsis">
          DUI
        </p>
        <p className="w-40 py-2 px-5 whitespace-nowrap">F. Nacimiento</p>
      </div>
      {filteredData.map((item) => (
        <HCardPaciente
          path={path}
          key={item.id}
          fecha={item.birthday}
          name={item.name}
          dui={item.dui}
          id={item.id}
        />
      ))}
    </div>
  );
}
