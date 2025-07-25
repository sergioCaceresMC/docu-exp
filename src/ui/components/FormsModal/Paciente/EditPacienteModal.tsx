import { useState } from "react";
import Alert from "../../Alertas/AlertProp";

type CreatePacienteModal = {
  id: string;
  name: string;
  address: string;
  gender: string;
  dui: string;
  birthday: Date;
  phone: string;
  isOpen: boolean;
  refresh: () => void;
  onConfirm: (id: string, data: any) => void;
  onCancel: () => void;
};

export function EditPacienteModal({
  id,
  name,
  address,
  dui,
  birthday,
  gender,
  phone,
  isOpen,
  refresh,
  onConfirm,
  onCancel,
}: CreatePacienteModal) {
  if (!isOpen) return null;

  const [data, setData] = useState({
    name,
    address,
    gender,
    dui,
    birthday,
    phone,
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
      if (!data.name || data.name === "") {
        setAlerta({ type: "error", message: "El título no es válido" });
        throw new Error("El título no es válido");
      }

      if (!data.dui || data.dui === "") {
        setAlerta({ type: "error", message: "El dui no es válido" });
        throw new Error("El dui no es válido");
      }

      if (!data.birthday) {
        setAlerta({ type: "error", message: "La fecha no es válida" });
        throw new Error("La fecha no es válida");
      }

      if (!id) {
        setAlerta({ type: "error", message: "El id_paciente no es válido" });
        throw new Error("El id_paciente no es válido");
      }

      const res = await onConfirm(id, data);

      //@ts-ignore
      if (!res) {
        throw new Error("Error al conectar con la base de datos");
      }
      refresh();
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
          className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between space-x-4">
            <div className="flex flex-col w-1/2">
              <label className="text-gray-500 text-lg mb-1">
                Nombre completo:
              </label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                className="border rounded px-3 py-2 text-gray-800"
                required
                maxLength={100}
              />
            </div>
            <div className="flex flex-col w-1/2">
              <label className="text-gray-500 text-lg mb-1">
                Fecha de nacimiento:
              </label>
              <input
                type="date"
                name="birthday"
                value={
                  new Date(
                    data.birthday instanceof Date
                      ? data.birthday.getTime() +
                        Math.abs(data.birthday.getTimezoneOffset()) * 60000
                      : data.birthday
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

          <div className="flex justify-between space-x-4">
            <div className="flex flex-col w-1/2 mt-5">
              <label className="text-gray-500 text-lg mb-1">Teléfono:</label>
              <input
                type="text"
                name="phone"
                value={data.phone}
                onChange={handleChange}
                className="border rounded px-3 py-2 text-gray-800"
                required
                maxLength={30}
              />
            </div>

            <div className="flex flex-col w-1/2 mt-5">
              <label className="text-gray-500 text-lg mb-1">dui:</label>
              <input
                type="text"
                name="dui"
                value={data.dui}
                onChange={handleChange}
                className="border rounded px-3 py-2 text-gray-800"
                required
                maxLength={20}
              />
            </div>
          </div>

          <div className="col-span-3 sm:col-span-2 lg:col-span-2 xl:col-span-1 mt-5">
            <label className="text-gray-500 text-lg mb-1">Sexo</label>
            <select
              name="gender"
              value={data.gender}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  gender: e.target.value,
                }))
              }
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
            >
              <option value="F">F</option>
              <option value="M">M</option>
            </select>
          </div>

          <div className="mt-6 flex flex-col">
            <label className="text-gray-500 text-lg mb-1">Dirección:</label>
            <input
              type="text"
              name="address"
              value={data.address}
              onChange={handleChange}
              className="border rounded px-3 py-2 text-gray-800"
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
