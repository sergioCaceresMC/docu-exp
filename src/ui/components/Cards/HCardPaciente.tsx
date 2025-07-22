import { useNavigate } from "react-router-dom";

export function HCardPaciente({
  fecha,
  name,
  dui,
  id,
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
      className="flex hover:bg-gray-50 inset-shadow-xs shadow-xs hover:cursor-pointer"
      onClick={() => {
        sessionStorage.setItem("id_paciente", id);
        navigate(`/paciente`);
      }}
    >
      <p className="w-50 md:w-80 px-6 py-5 whitespace-nowrap overflow-hidden text-ellipsis">
        {name}
      </p>
      <p className="flex-1 px-6 py-5 whitespace-nowrap overflow-hidden text-ellipsis">
        {dui}
      </p>
      <p className="w-40 text-center py-5 px-5 whitespace-nowrap">
        {formatted}
      </p>
    </div>
  );
}
