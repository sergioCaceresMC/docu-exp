import { SquarePen, Trash2 } from "lucide-react";
import Alert from "../../Alertas/AlertProp";
import { useState } from "react";
import { ConfirmModal } from "../../Alertas/ConfirmModal";

export function HCardViewFiles({
  refresh,
  name,
  dir,
  id,
}: {
  refresh: () => void;
  name: string;
  dir: string;
  id: string;
}) {
  const [alerta, setAlerta] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);
  const [modalDelOpen, setModalDelOpen] = useState(false);

  async function clickFile() {
    //@ts-ignore
    const open = await window.electronAPI.openFile(dir);
    console.log(open);
    !open.succes
      ? setAlerta({
          type: "error",
          message: "Error al abrir el archivo",
        })
      : "";
  }

  async function delAntecedente() {
    //@ts-ignore
    const res = await window.exLaboratorio.deleteFile(id);

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

      <ConfirmModal
        isOpen={modalDelOpen}
        message={`Se borrará el archivo "${name}", ¿Desea continuar?`}
        onConfirm={delAntecedente}
        onCancel={() => setModalDelOpen(false)}
      />

      <div
        id={id}
        title={name}
        className="grid grid-cols-[150px_auto_100px] md:grid-cols-[150px_auto_100px] lg:grid-cols-[150px_auto_100px] items-center border-b border-teal-600 hover:bg-gray-50"
      >
        <p
          onClick={clickFile}
          className=" py-5 px-5 whitespace-nowrap truncate overflow-hidden cursor-pointer"
        >
          {name}
        </p>
        <p
          onClick={clickFile}
          className="px-6 py-5 border-l border-teal-600 whitespace-nowrap overflow-hidden text-ellipsis cursor-pointer"
        >
          {dir}
        </p>
        <div className="px-3 py-4 ml-auto flex whitespace-nowrap">
          <button
            className="px-1 py-1 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-500 transition duration-150 ease-in-out hover:cursor-pointer flex"
            title="Cambiar referencia"
            onClick={async () => {
              //@ts-ignore
              const res = await window.electronAPI.selectFileAndUpdate(id);
              if (res.success) refresh();
            }}
          >
            <SquarePen />
          </button>
          <button
            className="ml-2 px-1 py-1 font-medium text-white bg-[#ff0000] rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-[#ff0000] transition duration-150 ease-in-out flex hover:cursor-pointer"
            title="Eliminar referencia"
            onClick={() => setModalDelOpen(true)}
          >
            <Trash2 />
          </button>
        </div>
      </div>
    </>
  );
}
