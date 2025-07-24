import { useState } from "react";
import Alert from "../../Alertas/AlertProp";

type CreateAntecedenteModal = {
  type: string;
  isOpen: boolean;
  onConfirm: (id: string, data: any) => void;
  onCancel: () => void;
};

export function CreateAntecedenteModal({
  type,
  isOpen,
  onConfirm,
  onCancel,
}: CreateAntecedenteModal) {
  const paciente = sessionStorage.getItem("id_paciente");
  if (!isOpen || !paciente) return null;

  const [data, setData] = useState({
    name: "",
    description: "",
    date: new Date(), // mantenemos la fecha como string para el input type="date"
  });

  const [alerta, setAlerta] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  async function confirm(e: any) {
    e.preventDefault();
    try {
      if (!data.name || data.name === "") {
        setAlerta({ type: "error", message: "El título no es válido" });
        throw new Error("El título no es válido");
      }
      if (!data.date) {
        setAlerta({ type: "error", message: "La fecha no es válida" });
        throw new Error("La fecha no es válida");
      }

      if (!paciente) {
        setAlerta({ type: "error", message: "El id_paciente no es válido" });
        throw new Error("El id_paciente no es válido");
      }

      const res = await onConfirm(paciente, data);
      //console.log(res);
      //@ts-ignore
      if (!res) {
        throw new Error("Error al conectar con la base de datos");
      }
      onCancel();
    } catch (error) {
      console.log(error);
      //@ts-ignore
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
          className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between space-x-4">
            <div className="flex flex-col w-1/2">
              <label className="text-gray-500 text-lg mb-1">
                {type.charAt(0).toUpperCase() + type.slice(1)}:
              </label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                className="border rounded px-3 py-2 text-gray-800"
                required
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-gray-500 text-lg mb-1">Fecha:</label>
              <input
                type="date"
                name="date"
                value={
                  new Date(
                    new Date(data.date).getTime() +
                      Math.abs(new Date(data.date).getTimezoneOffset()) * 60000
                  )
                    .toISOString()
                    .split("T")[0]
                }
                onChange={handleChange}
                className="border rounded px-3 py-2 text-gray-800"
                required
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col">
            <label className="text-gray-500 text-lg mb-1">Descripción:</label>
            <textarea
              name="description"
              value={data.description}
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
