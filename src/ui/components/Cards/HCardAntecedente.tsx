import { SquarePen, Trash2 } from "lucide-react";
import { CardModalAntecedentes } from "./CardModalAntecedentes";
import { useState } from "react";
import { ConfirmModal } from "../FormsModal/ConfirmModal";
import Alert from "../Alertas/AlertProp";

export function HCardAntecedente({
  fecha,
  name,
  description,
  delFunction,
  id,
  type,
}: {
  fecha: string;
  name: string;
  description: string;
  id: string;
  type: string;
  delFunction: any;
}) {
  const date = new Date(fecha);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const aa = String(date.getFullYear()).slice(-2);

  const formatted = `${dd}/${mm}/${aa}`;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalDelOpen, setModalDelOpen] = useState(false);
  const [alerta, setAlerta] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  async function delAntecedente() {
    const res = await delFunction(id);

    if (res == 0) {
      setAlerta({
        type: "error",
        message: "Error al eliminar el antecedente",
      });
    }
    setAlerta({
      type: "success",
      message: "Antecedente eliminado",
    });

    window.location.reload();
  }

  return (
    <>
      {alerta && (
        <Alert
          type={alerta.type}
          message={alerta.message}
          onClose={() => setAlerta(null)}
        />
      )}

      <CardModalAntecedentes
        isOpen={modalOpen}
        onCancel={() => setModalOpen(false)}
        fecha={formatted}
        name={name}
        description={description}
        type={type}
      />

      <ConfirmModal
        isOpen={modalDelOpen}
        message={`Se borrará el elemento "${type}: ${name}", ¿Desea continuar?`}
        onConfirm={delAntecedente}
        onCancel={() => setModalDelOpen(false)}
      />
      <div
        id={id}
        className="grid grid-cols-[150px_200px_1fr_auto] items-center 
             inset-shadow-xs hover:bg-gray-50 shadow-xs 
             border-b border-gray-200 w-full"
      >
        <p
          onClick={() => setModalOpen(true)}
          className="py-5 px-4 whitespace-nowrap cursor-pointer"
        >
          {formatted}
        </p>

        <p
          onClick={() => setModalOpen(true)}
          className="py-5 px-4 border-l border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer"
        >
          {name}
        </p>

        <p
          onClick={() => setModalOpen(true)}
          className="py-5 px-4 border-l md:inline-block hidden border-gray-200 h-full whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer"
        >
          {description}
        </p>

        <div className="py-4 px-4 border-l border-gray-200 ml-auto md:ml-0 flex gap-2">
          <button className="px-2 py-1 text-white bg-blue-500 rounded hover:bg-blue-600">
            <SquarePen />
          </button>
          <button
            onClick={() => {
              setModalDelOpen(true);
            }}
            className="px-2 py-1 text-white bg-red-600 rounded hover:bg-red-700 cursor-pointer"
          >
            <Trash2 />
          </button>
        </div>
      </div>
    </>
  );
}
