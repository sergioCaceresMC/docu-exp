import { SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function HCardPaciente({
  fecha,
  name,
  dui,
  id,
  path,
}: {
  fecha: string;
  name: string;
  dui: string;
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
      className="flex shadow-md inset-shadow-2xs hover:cursor-pointer rounded-lg"
      onClick={() => {
        sessionStorage.setItem("id_paciente", id);
        navigate(`/paciente`);
      }}
    >
      <p className="flex-1 px-6 py-5 whitespace-nowrap overflow-hidden text-ellipsis">
        Nombre: {name}
      </p>
      <p className=" py-5 pl-5 whitespace-nowrap">--</p>
      <p className="flex-1 px-6 py-5 whitespace-nowrap overflow-hidden text-ellipsis">
        DUI: {dui}
      </p>
      <p className=" py-5 pl-5 whitespace-nowrap">--</p>
      <p className=" py-5 px-5 whitespace-nowrap">F. Nacimiento: {formatted}</p>
    </div>
  );
}
