import { useEffect, useState } from "react";
import { HCard } from "../Cards/HCard";

type FetchFunction = (
  id: string,
  from: Date,
  to: Date
) => Promise<
  {
    id: string;
    tratment: string;
    date: string;
  }[]
>;

type ListaConsultasProps = {
  search: string;
  from: Date;
  to: Date;
  path: string;
  fetchFunction: FetchFunction;
};

export function ListaTratamientos({
  search,
  from,
  to,
  path,
  fetchFunction,
}: ListaConsultasProps) {
  const [data, setData] = useState<
    { id: string; tratment: string; date: string }[]
  >([]);

  const [filteredData, setFilteredData] = useState<
    { id: string; tratment: string; date: string }[]
  >([]);

  const paciente = sessionStorage.getItem("id_paciente");

  useEffect(() => {
    const fetchData = async () => {
      if (!paciente) return;

      try {
        //@ts-ignore
        const dfetch = await fetchFunction(paciente, from, to);
        setData(dfetch);
        setFilteredData(dfetch); // Inicialmente sin filtro
      } catch (error) {
        console.error("Error al obtener consultas:", error);
      }
    };

    fetchData();
  }, [paciente, from, to]);

  // Filtrar cuando cambia `search`
  useEffect(() => {
    const lowerSearch = search.toLowerCase();

    const filtered = data.filter((item) =>
      item.tratment.toLowerCase().includes(lowerSearch)
    );

    setFilteredData(filtered);
  }, [search, data]);

  return (
    <div className="flex flex-col gap-2">
      {filteredData.map((item) => (
        <HCard
          key={item.id}
          path={path}
          fecha={item.date}
          text={item.tratment}
          id={item.id}
        />
      ))}
    </div>
  );
}
