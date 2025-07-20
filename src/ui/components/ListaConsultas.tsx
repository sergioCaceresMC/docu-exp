import { useEffect, useState } from "react";
import { HCard } from "./HCard";

type FetchFunction = (
  id: string,
  from: Date,
  to: Date
) => Promise<
  {
    id: string;
    reason: string;
    date: string;
  }[]
>;

type ListaConsultasProps = {
  search: string;
  from: Date;
  to: Date;
  fetchFunction: FetchFunction;
};

export function ListaConsultas({
  search,
  from,
  to,
  fetchFunction,
}: ListaConsultasProps) {
  const [data, setData] = useState<
    { id: string; reason: string; date: string }[]
  >([]);

  const [filteredData, setFilteredData] = useState<
    { id: string; reason: string; date: string }[]
  >([]);
  sessionStorage.setItem("id_paciente", "b950098c-fcf8-4602-a9b6-a7791468d446");
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
      item.reason.toLowerCase().includes(lowerSearch)
    );

    setFilteredData(filtered);
  }, [search, data]);

  return (
    <div className="flex flex-col gap-2">
      {filteredData.map((item) => (
        <HCard
          key={item.id}
          fecha={item.date}
          text={item.reason}
          id={item.id}
        />
      ))}
    </div>
  );
}
