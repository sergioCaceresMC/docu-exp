import { SquarePen } from "lucide-react";

export function HCard({
  fecha,
  text,
  id,
}: {
  fecha: string;
  text: string;
  id: string;
}) {
  /*
  const formatted = new Intl.DateTimeFormat("es-ES", {
    weekday: "long", // lunes, martes...
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(fecha));*/

  const date = new Date(fecha); // asegúrate de que `a` es Date
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // enero = 0
  const aa = String(date.getFullYear()).slice(-2);

  const formatted = `${dd}/${mm}/${aa}`;

  return (
    <div
      id={id}
      className="flex shadow-md inset-shadow-2xs hover:cursor-pointer rounded-lg"
    >
      <p className=" py-5 pl-5 whitespace-nowrap">{formatted}</p>
      <p className=" py-5 pl-5 whitespace-nowrap">--</p>
      <p className="flex-1 px-6 py-5 whitespace-nowrap overflow-hidden text-ellipsis">
        {text}
      </p>
      <div className="px-3 py-4 flex whitespace-nowrap">
        <button className="px-3 py-1 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-500 transition duration-150 ease-in-out hover:cursor-pointer flex">
          <SquarePen /> <span className="pl-2">Editar</span>
        </button>
        <button className="ml-2 px-3 py-1 font-medium text-white bg-[#ff0000] rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-[#ff0000] transition duration-150 ease-in-out flex hover:cursor-pointer">
          <SquarePen /> <span className="pl-2">Eliminar</span>
        </button>
      </div>
    </div>
  );
}
