import { SquarePen, Trash2 } from "lucide-react";
import { CardModalAntecedentes } from "./CardModalAntecedentes";
import { useState } from "react";

export function HCardAntecedente({
  fecha,
  name,
  description,
  id,
  type,
}: {
  fecha: string;
  name: string;
  description: string;
  id: string;
  type: string;
}) {
  const date = new Date(fecha);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const aa = String(date.getFullYear()).slice(-2);

  const formatted = `${dd}/${mm}/${aa}`;

  const [modalOpen, setModalOpen] = useState(false);
  const [alerta, setAlerta] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  return (
    <>
      <CardModalAntecedentes
        isOpen={modalOpen}
        message="¿Desea borrar el paciente y todos los datos relacionados de forma permanente?"
        onConfirm={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        fecha={formatted}
        name={name}
        description={description}
        type={type}
      />
      <div
        id={id}
        onClick={() => setModalOpen(true)}
        className="grid grid-cols-[150px_200px_1fr_auto] items-center 
             inset-shadow-xs hover:bg-gray-50 shadow-xs 
             hover:cursor-pointer border-b border-gray-200 w-full"
      >
        <p className="py-5 px-4 whitespace-nowrap">{formatted}</p>

        <p className="py-5 px-4 border-l border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis">
          {name}
        </p>

        <p className="py-5 px-4 border-l md:inline-block hidden border-gray-200 h-full whitespace-nowrap overflow-hidden text-ellipsis">
          {description}
        </p>

        <div className="py-4 px-4 border-l border-gray-200 ml-auto md:ml-0 flex gap-2">
          <button className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">
            <SquarePen />
          </button>
          <button className="px-2 py-1 text-white bg-red-600 rounded hover:bg-red-700">
            <Trash2 />
          </button>
        </div>
      </div>
    </>
  );
}
