import { SquarePen, Trash2 } from "lucide-react";

export function HCardViewFiles({
  name,
  dir,
  id,
}: {
  name: string;
  dir: string;
  id: string;
}) {
  return (
    <div
      id={id}
      title="Ir a consulta..."
      className="grid grid-cols-[150px_200px_1fr_auto] md:grid-cols-[150px_300px_1fr_auto] lg:grid-cols-[150px_400px_1fr_auto] items-center border-b border-teal-600 hover:bg-gray-50 hover:cursor-pointer"
      onClick={async () => {
        //@ts-ignore
        const open = await window.electronAPI.openFile(dir);
        console.log(open);
        !open.succes
          ? alert("El archivo no existe o ya no está en el mismo directorio")
          : "";
      }}
    >
      <p className=" py-5 px-5 whitespace-nowrap">{name}</p>
      <p className="flex-1 px-6 py-5 border-l border-teal-600 whitespace-nowrap overflow-hidden text-ellipsis">
        {dir}
      </p>
      <div className="px-3 py-4 ml-auto flex whitespace-nowrap">
        <button
          className="px-1 py-1 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-500 transition duration-150 ease-in-out hover:cursor-pointer flex"
          title="Cambiar referencia"
        >
          <SquarePen />
        </button>
        <button
          className="ml-2 px-1 py-1 font-medium text-white bg-[#ff0000] rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-[#ff0000] transition duration-150 ease-in-out flex hover:cursor-pointer"
          title="Eliminar referencia"
        >
          <Trash2 />
        </button>
      </div>
    </div>
  );
}
