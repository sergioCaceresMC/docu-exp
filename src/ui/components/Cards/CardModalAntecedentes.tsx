type ConfirmModalProps = {
  isOpen: boolean;
  fecha: string;
  name: string;
  description: string;
  type: string;
  onCancel: () => void;
};

export function CardModalAntecedentes({
  fecha,
  name,
  description,
  type,
  isOpen,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Fondo semitransparente */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onCancel} />

      {/* Modal centrado */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div
          className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between">
            <div className="flex">
              <label className="text-gray-500 text-lg">
                {type.charAt(0).toUpperCase() + type.slice(1)}:
              </label>
              <p className="text-gray-800 text-lg pl-5">{name}</p>
            </div>

            <div className="flex">
              <label className="text-gray-500 text-lg">Fecha:</label>
              <p className="text-gray-800 text-lg pl-5">{fecha}</p>
            </div>
          </div>

          <div className="mt-6 flex-col">
            <label className="text-gray-500 text-lg ">Descripción:</label>
            <p className="text-gray-800 text-lg">{description}</p>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 cursor-pointer rounded bg-gray-300 hover:bg-gray-400 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
