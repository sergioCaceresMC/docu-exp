import { SquarePen, SquarePlus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { HCardViewFiles } from "./ViewCards/HCardViewFiles";

type LabData = {
  id: string;
  name: string;
  laboratory: string;
  date: Date;
  content: string;
  archivos: any;
};

export function ViewLaboratorio({ id }: { id: any }) {
  const [data, setData] = useState<LabData>({
    id: "",
    name: "",
    laboratory: "",
    date: new Date(),
    content: "",
    archivos: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        //@ts-ignore
        const dfetch = await window.exLaboratorio.getLaboratorioById(id);

        setData(dfetch);
      } catch (error) {
        console.error("Error al obtener datos del paciente:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      <div className="p-5 rounded-t-2xl bg-teal-500">
        <h1 className="text-3xl font-semibold text-white">
          {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
        </h1>
      </div>
      <div className="p-5 rounded-b-2xl inset-shadow-2xs border-2 border-teal-500 ">
        <div className="flex flex-col-reverse lg:flex-row lg:gap-10">
          <div className="flex flex-1 flex-col mb-3 gap-2">
            <label className="text-gray-500 text-lg">Laboratorio:</label>
            <p className="text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2">
              {data.laboratory}
            </p>
          </div>
          <div className="flex flex-col mb-3 pr-5 gap-2">
            <label className="text-gray-500 text-lg">Fecha de examen:</label>
            <p className="text-lg ">{data.date.toDateString()}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 pb-5">
          <label className="text-gray-500 text-lg pl-2">Notas de examen:</label>
          <p className="text-lg bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4">
            {data.content}
          </p>
        </div>

        <div className=" pt-4 pb-4 border-gray-300 flex whitespace-nowrap">
          <button className="px-3 py-1 ml-auto font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-500 transition duration-150 ease-in-out hover:cursor-pointer flex">
            <SquarePen /> <span className="pl-2">Editar laboratorio</span>
          </button>
          <button className="ml-2 px-3 py-1 font-medium text-white bg-[#ff0000] rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-[#ff0000] transition duration-150 ease-in-out flex hover:cursor-pointer">
            <Trash2 /> <span className="pl-2">Borrar laboratorio</span>
          </button>
        </div>
        <div className="pt-5 border-t border-gray-300">
          <label className="text-gray-500 text-lg pl-2 pb-2 mb-5">
            Archivos:
          </label>
          <div className="border-teal-600 border border-b-0 mt-5">
            <div className="grid grid-cols-[150px_200px_1fr_auto] md:grid-cols-[150px_300px_1fr_auto] lg:grid-cols-[150px_400px_1fr_auto] border-b bg-teal-500 text-white items-center ">
              <p className=" py-2 px-5 whitespace-nowrap truncate overflow-hidden">
                Archivo:
              </p>
              <p className="flex-1 px-6 py-2 border-l border-teal-600 whitespace-nowrap overflow-hidden text-ellipsis">
                Ruta:
              </p>
            </div>
            {data.archivos?.map((item: { dataValues: any }) => {
              const file = item.dataValues;
              return (
                <HCardViewFiles
                  key={file.id}
                  name={file.name}
                  dir={file.direction}
                  id={file.id}
                />
              );
            })}
          </div>
          <button
            title="Nuevo archivo"
            className="px-1 py-1 ml-auto mt-5 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-500 transition duration-150 ease-in-out hover:cursor-pointer flex"
          >
            <SquarePlus />{" "}
            <span className="hidden lg:inline-block lg:px-2">
              Nuevo archivo
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
