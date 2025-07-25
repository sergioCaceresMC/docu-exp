import { ChevronDown, ChevronUp, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
import Alert from "../../Alertas/AlertProp";
import { ConfirmModal } from "../../Alertas/ConfirmModal";
import { EditTratamientoModal } from "../../FormsModal/Tratamientos/EditTratamientoModal";
import { EditDiagnosticoModal } from "../../FormsModal/Diagnosticos/EditDiagnosticoModal";

export function HCardView({
  type,
  title,
  notes,
  date,
  prescription = "",
  funcion,
  id,
  refresh,
}: {
  type: string;
  funcion: any;
  title: string;
  date: string;
  prescription: string;
  notes: string;
  id: string;
  refresh: () => void;
}) {
  const safeFecha =
    typeof date === "string"
      ? date
      : //@ts-ignore
      date instanceof Date
      ? //@ts-ignore
        date.toISOString().split("T")[0]
      : "";

  const [aa, mm, dd] = safeFecha.split("-");
  const formatted = `${dd}/${mm}/${aa?.slice(-2)}`;

  const [isOpen, setIsOpen] = useState(true);
  const [modalDelOpen, setModalDelOpen] = useState(false);
  const [modalEditOpen, setModalEditOpen] = useState(false);

  const [alerta, setAlerta] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  async function delElemento() {
    const res = await funcion(id);

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

      {type === "tratamiento" ? (
        <EditTratamientoModal
          fecha={date}
          tratment={title}
          notes={notes}
          prescription={prescription}
          id={id}
          isOpen={modalEditOpen}
          onConfirm={
            //@ts-ignore
            window.tratamiento.updateTratamiento
          }
          onCancel={() => setModalEditOpen(false)}
          refresh={refresh}
        />
      ) : (
        <EditDiagnosticoModal
          fecha={date}
          diagnosis={title}
          notes={notes}
          id={id}
          isOpen={modalEditOpen}
          onConfirm={
            //@ts-ignore
            window.diagnostico.updateDiagnostico
          }
          onCancel={() => setModalEditOpen(false)}
          refresh={refresh}
        />
      )}

      <ConfirmModal
        isOpen={modalDelOpen}
        message={`Se borrará el elemento "${title}", ¿Desea continuar?`}
        onConfirm={delElemento}
        onCancel={() => setModalDelOpen(false)}
      />

      <div
        id={id}
        className="flex flex-col inset-shadow-2xs border-gray-200 border-t  "
      >
        <div
          className={`flex justify-between px-6 hover:bg-gray-50 items-center ${
            isOpen ? `py-5 ` : `pt-5 pb-3`
          } hover:cursor-pointer`}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <p
            className={`pr-6  text-lg whitespace-nowrap overflow-hidden text-ellipsis ${
              isOpen ? `` : `font-semibold`
            }`}
          >
            {title}
          </p>
          <ChevronDown className={isOpen ? `` : `hidden`} />
          <ChevronUp className={isOpen ? `hidden` : ``} />
        </div>

        <div
          className={
            isOpen ? `hidden` : `px-6 flex flex-col border-t border-gray-200`
          }
        >
          <div className="flex flex-col mb-3 pr-5 gap-2">
            <label className="text-md pt-6 font-semibold text-gray-900 block mb-2">
              Fecha:
            </label>
            <p className="text-lg ">{formatted}</p>
          </div>
          <label className="text-md pt-6 font-semibold text-gray-900 block mb-2">
            Notas
          </label>
          <p className="pb-3  whitespace-wrap overflow-auto text-ellipsis">
            {notes || "--"}
          </p>
          {prescription && prescription !== "" ? (
            <>
              <label className="text-md pt-6 font-semibold text-gray-900 block mb-2">
                Receta
              </label>
              <p className="pb-3  whitespace-wrap overflow-auto text-ellipsis">
                {prescription}
              </p>
            </>
          ) : (
            ""
          )}
          <div className="py-4 flex whitespace-nowrap">
            <button
              className="px-1 py-1 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-500 transition duration-150 ease-in-out hover:cursor-pointer flex"
              onClick={() => setModalEditOpen(true)}
            >
              <SquarePen />{" "}
              <span className="hidden lg:inline-block lg:px-2">Editar</span>
            </button>
            <button
              onClick={() => {
                setModalDelOpen(true);
              }}
              className="ml-2 px-1 py-1 font-medium text-white bg-[#ff0000] rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-[#ff0000] transition duration-150 ease-in-out flex hover:cursor-pointer"
            >
              <Trash2 />{" "}
              <span className=" hidden lg:inline-block lg:px-2">Eliminar</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
