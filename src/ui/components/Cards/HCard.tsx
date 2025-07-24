import { SquarePen, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HCard({
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
      className="flex shadow-md inset-shadow-2xs hover:bg-gray-50 hover:cursor-pointer rounded-lg"
      onClick={() => {
        navigate(`${path}/${id_path}`);
      }}
    >
      <p className=" py-5 px-5 whitespace-nowrap">{formatted}</p>
      <p className="flex-1 px-6 py-5 border-l border-gray-300 whitespace-nowrap overflow-hidden text-ellipsis">
        {text}
      </p>
    </div>
  );
}
