import { SquarePen, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HCardAntecedente({
  fecha,
  name,
  description,
  id,
  path,
}: {
  fecha: string;
  name: string;
  description: string;
  id: string;
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
      className="grid grid-cols-[150px_200px_1fr_auto] items-center 
             inset-shadow-xs hover:bg-gray-50 shadow-xs 
             hover:cursor-pointer border-b border-gray-200 w-full"
      onClick={() => {
        navigate(`${path}/${id}`);
      }}
    >
      <p className="py-5 px-4 whitespace-nowrap">{formatted}</p>

      <p className="py-5 px-4 border-l border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
        {name}
      </p>

      <p className="py-5 px-4 border-l md:inline-block hidden border-gray-200 h-full whitespace-nowrap overflow-hidden text-ellipsis">
        {description}
      </p>

      <div
        className="py-4 px-4 border-l border-gray-200 ml-auto md:ml-0 flex gap-2"
        onClick={(e) => e.stopPropagation()} // Para evitar que el botón dispare el navigate
      >
        <button className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">
          <SquarePen />
        </button>
        <button className="px-2 py-1 text-white bg-red-600 rounded hover:bg-red-700">
          <Trash2 />
        </button>
      </div>
    </div>
  );
}
