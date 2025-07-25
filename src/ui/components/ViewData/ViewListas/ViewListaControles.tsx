import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, SquarePlus } from "lucide-react";
import { HCardViewControles } from "../ViewCards/HCardViewControles";
import { CreateConsultaModal } from "../../FormsModal/Consulta/CreateConsultaModal";

type FetchFunction = (id: string) => Promise<
  {
    id: string;
    reason: string;
    date: string;
  }[]
>;

type ListaConsultasProps = {
  path: string;
  type: string;
  id: any;
  typeSingular: string;
  search: string;
  fetchFunction: FetchFunction;
};

export function ViewListaControles({
  search,
  type,
  id,
  typeSingular,
  path,
  fetchFunction,
}: ListaConsultasProps) {
  const [openNewModal, setOpenNewModal] = useState(false);

  const [data, setData] = useState<
    { id: string; reason: string; date: string }[]
  >([]);

  const [filteredData, setFilteredData] = useState<
    { id: string; reason: string; date: string }[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        //@ts-ignore
        const dfetch = await fetchFunction(id);
        setData(dfetch);
        setFilteredData(dfetch); // Inicialmente sin filtro
      } catch (error) {
        console.error("Error al obtener consultas:", error);
      }
    };

    fetchData();
  }, [id]);

  // Filtrar cuando cambia `search`
  useEffect(() => {
    const lowerSearch = search.toLowerCase();

    const filtered = data.filter((item) =>
      item.reason.toLowerCase().includes(lowerSearch)
    );

    setFilteredData(filtered);
  }, [search, data]);

  return (
    <>
      <CreateConsultaModal
        isOpen={openNewModal}
        onConfirm={
          //@ts-ignore
          window.consulta.createConstrolByConsulta
        }
        onCancel={() => setOpenNewModal(false)}
        id={id}
        type={"control"}
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
              <HCardViewControles
                id_path={item.id}
                path={path}
                key={item.id}
                fecha={item.date}
                text={item.reason}
                id={item.id}
              />
            ))}
            <div
              className="flex justify-center bg-sky-500 hover:bg-blue-500 rounded-b font-semibold text-white inset-shadow-xs p-2 shadow-xs hover:cursor-pointer"
              onClick={() => setOpenNewModal(true)}
            >
              <p className="pr-2">Nuevo {typeSingular}</p> <SquarePlus />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
