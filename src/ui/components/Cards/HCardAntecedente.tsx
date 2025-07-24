import { SquarePen, Trash2 } from "lucide-react";
import { CardModalAntecedentes } from "../ViewData/ViewCards/CardModalAntecedentes";
import { useState } from "react";
import { ConfirmModal } from "../Alertas/ConfirmModal";
import Alert from "../Alertas/AlertProp";
import { EditAntecedenteModal } from "../FormsModal/Antecedentes/EditAntecedenteModal";

export function HCardAntecedente({
  refresh,
  fecha,
  name,
  description,
  delFunction,
  updateFunction,
  id,
  type,
}: {
  refresh: () => void;
  fecha: string;
  name: string;
  description: string;
  id: string;
  type: string;
  delFunction: any;
  updateFunction: any;
}) {
  const safeFecha =
    typeof fecha === "string"
      ? fecha
      : //@ts-ignore
      fecha instanceof Date
      ? //@ts-ignore
        fecha.toISOString().split("T")[0]
      : "";

  const [aa, mm, dd] = safeFecha.split("-");
  const formatted = `${dd}/${mm}/${aa?.slice(-2)}`;

  const [modalViewOpen, setModalViewOpen] = useState(false);
  const [modalDelOpen, setModalDelOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);

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

    refresh();
    //window.location.reload();
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

      <EditAntecedenteModal
        refresh={refresh}
        fecha={fecha}
        name={name}
        description={description}
        id={id}
        type={type}
        isOpen={modalEditOpen}
        onConfirm={updateFunction}
        onCancel={() => setModalEditOpen(false)}
      />

      <CardModalAntecedentes
        isOpen={modalViewOpen}
        onCancel={() => setModalViewOpen(false)}
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
          onClick={() => setModalViewOpen(true)}
          className="py-5 px-4 whitespace-nowrap cursor-pointer"
        >
          {formatted}
        </p>

        <p
          onClick={() => setModalViewOpen(true)}
          className="py-5 px-4 border-l border-gray-200 whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer"
        >
          {name}
        </p>

        <p
          onClick={() => setModalViewOpen(true)}
          className="py-5 px-4 w-full border-l md:inline-block hidden border-gray-200 h-full whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer"
        >
          {description}
        </p>

        <div className="py-4 px-4 border-l border-gray-200 ml-auto md:ml-0 flex gap-2">
          <button
            onClick={() => {
              setModalEditOpen(true);
            }}
            className="px-2 py-1 cursor-pointer text-white bg-blue-500 rounded hover:bg-blue-600"
          >
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
