import { useState } from "react";
import Alert from "../../Alertas/AlertProp";
import { useNavigate } from "react-router-dom";

type CreateExamenModal = {
  id: string;
  type: string;
  isOpen: boolean;
  onConfirm: (id: string, data: any) => void;
  onCancel: () => void;
};

export function CreateConsultaModal({
  id,
  type,
  isOpen,
  onConfirm,
  onCancel,
}: CreateExamenModal) {
  if (!isOpen) return null;

  const navigate = useNavigate();

  const [data, setData] = useState({
    reason: "",
    type,
    content: "",
    date: new Date(),
  });

  const [alerta, setAlerta] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    // Si el campo es de fecha y se borra, no actualices el estado
    if (name === "date" && value === "") return;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  async function confirm(e: any) {
    e.preventDefault();
    try {
      if (!data.reason || data.reason === "") {
        setAlerta({ type: "error", message: "El título no es válido" });
        throw new Error("El título no es válido");
      }

      if (!data.date) {
        setAlerta({ type: "error", message: "La fecha no es válida" });
        throw new Error("La fecha no es válida");
      }

      if (!id) {
        setAlerta({ type: "error", message: "El id de consulta no es válido" });
        throw new Error("El id no es válido");
      }

      const res = await onConfirm(id, data);
      //@ts-ignore
      if (!res) {
        throw new Error("Error al conectar con la base de datos");
      }
      //@ts-ignore
      navigate(`/consultas/${res.id}`);
      onCancel();
    } catch (error) {
      console.log(error);
    }
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

      {/* Fondo semitransparente */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onCancel} />

      {/* Modal centrado */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div
          className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between space-x-4">
            <div className="flex flex-col w-1/2">
              <label className="text-gray-500 text-lg mb-1">
                Motivo de {type}:
              </label>
              <input
                type="text"
                name="reason"
                value={data.reason}
                onChange={handleChange}
                className="border rounded px-3 py-2 text-gray-800"
                required
                maxLength={60}
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-gray-500 text-lg mb-1">Fecha:</label>
              <input
                type="date"
                name="date"
                value={
                  new Date(
                    data.date instanceof Date
                      ? data.date.getTime() +
                        Math.abs(data.date.getTimezoneOffset()) * 60000
                      : data.date
                  )
                    .toISOString()
                    .split("T")[0]
                }
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    date: new Date(e.target.value),
                  }))
                }
                className="border rounded px-3 py-2 text-gray-800"
                required
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col">
            <label className="text-gray-500 text-lg mb-1">
              Notas de {type}:
            </label>
            <textarea
              name="content"
              value={data.content}
              onChange={handleChange}
              className="border rounded px-3 py-2 text-gray-800 min-h-[100px]"
              required
            />
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 cursor-pointer rounded bg-gray-300 hover:bg-gray-400 transition"
            >
              Cerrar
            </button>

            <button
              type="submit"
              onClick={(e) => confirm(e)}
              className="px-4 py-2 cursor-pointer rounded bg-blue-500 hover:bg-blue-600 transition text-white"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
