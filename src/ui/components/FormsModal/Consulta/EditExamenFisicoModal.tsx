import { useEffect, useState } from "react";
import Alert from "../../Alertas/AlertProp";

type ExFisicoData = {
  arterialPressure: string;
  cardiacFrecuency: number;
  respiratorRate: number;
  weight: number;
  height: number;
  temperature: number;
  abdominalcircunference: number;
  oxygensaturation: number;
};

type EditExFisicoModalProps = {
  id: string;
  data: ExFisicoData;
  isOpen: boolean;
  onConfirm: (id: string, data: any) => void;
  onCancel: () => void;
  refresh: () => void;
};

export function EditExFisicoModal({
  data: initialData,
  id,
  isOpen,
  refresh,
  onConfirm,
  onCancel,
}: EditExFisicoModalProps) {
  if (!isOpen) return null;

  const [data, setData] = useState<ExFisicoData>(initialData);

  useEffect(() => {
    if (isOpen) {
      setData(initialData);
    }
  }, [initialData, isOpen]);

  const [alerta, setAlerta] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: name === "arterialPressure" ? value : Number(value),
    }));
  };

  const confirm = async (e: any) => {
    e.preventDefault();
    try {
      const res = await onConfirm(id, data);

      //@ts-ignore
      if (res == 0) {
        throw new Error("Error al conectar con la base de datos");
      }
      refresh();
      onCancel();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {alerta && (
        <Alert
          type={alerta.type}
          message={alerta.message}
          onClose={() => setAlerta(null)}
        />
      )}

      <div className="fixed inset-0 bg-black/40 z-40" onClick={onCancel} />

      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div
          className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-xl font-semibold mb-6">Editar examen físico</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-gray-500 text-sm mb-1">
                Presión arterial
              </label>
              <input
                type="text"
                name="arterialPressure"
                value={data.arterialPressure}
                onChange={handleChange}
                className="border rounded px-3 py-2 text-gray-800"
                maxLength={20}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500 text-sm mb-1">
                Frecuencia cardíaca (bpm)
              </label>
              <input
                type="number"
                name="cardiacFrecuency"
                value={data.cardiacFrecuency}
                onChange={handleChange}
                className="border rounded px-3 py-2 text-gray-800"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500 text-sm mb-1">
                Frecuencia respiratoria (rpm)
              </label>
              <input
                type="number"
                name="respiratorRate"
                value={data.respiratorRate}
                onChange={handleChange}
                className="border rounded px-3 py-2 text-gray-800"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500 text-sm mb-1">Peso (kg)</label>
              <input
                type="number"
                name="weight"
                value={data.weight}
                onChange={handleChange}
                className="border rounded px-3 py-2 text-gray-800"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500 text-sm mb-1">
                Estatura (cm)
              </label>
              <input
                type="number"
                name="height"
                value={data.height}
                onChange={handleChange}
                className="border rounded px-3 py-2 text-gray-800"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500 text-sm mb-1">
                Temperatura (°C)
              </label>
              <input
                type="number"
                name="temperature"
                value={data.temperature}
                onChange={handleChange}
                className="border rounded px-3 py-2 text-gray-800"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500 text-sm mb-1">
                Circunferencia abdominal (cm)
              </label>
              <input
                type="number"
                name="abdominalcircunference"
                value={data.abdominalcircunference}
                onChange={handleChange}
                className="border rounded px-3 py-2 text-gray-800"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-gray-500 text-sm mb-1">
                Saturación de oxígeno (%)
              </label>
              <input
                type="number"
                name="oxygensaturation"
                value={data.oxygensaturation}
                onChange={handleChange}
                className="border rounded px-3 py-2 text-gray-800"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              onClick={confirm}
              className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 transition text-white cursor-pointer"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
