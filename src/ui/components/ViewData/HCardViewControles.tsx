import { SquarePen, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HCardViewControles({
  fecha,
  text,
  id,
  id_path = "",
  path,
}: {
  fecha: string;
  text: string;
  id: string;
  id_path: string;
  path: string;
}) {
  const navigate = useNavigate();

  const date = new Date(fecha);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const aa = String(date.getFullYear()).slice(-2);

  const formatted = `${dd}/${mm}/${aa}`;

  return (
    <div
      id={id}
      title="Ir a consulta..."
      className="flex border-t border-gray-200 hover:bg-gray-50 hover:cursor-pointer"
      onClick={() => {
        navigate(`${path}/${id_path}`);
      }}
    >
      <p className=" py-5 px-5 whitespace-nowrap">{formatted}</p>
      <p className="flex-1 px-6 py-5 border-l border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
        {text}
      </p>
      <div className="px-3 py-4 flex whitespace-nowrap">
        <button className="px-1 py-1 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-500 transition duration-150 ease-in-out hover:cursor-pointer flex">
          <SquarePen />{" "}
          <span className="hidden lg:inline-block lg:px-2">Editar</span>
        </button>
        <button className="ml-2 px-1 py-1 font-medium text-white bg-[#ff0000] rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-[#ff0000] transition duration-150 ease-in-out flex hover:cursor-pointer">
          <Trash2 />{" "}
          <span className=" hidden lg:inline-block lg:px-2">Eliminar</span>
        </button>
      </div>
    </div>
  );
}
