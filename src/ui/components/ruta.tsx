import { useState } from "react";

function SQLiteFileSelector() {
  const [filePath, setFilePath] = useState("");

  const handleSelectFile = async () => {
    //@ts-ignore
    const path = await window.electronAPI.selectFile();
    if (path) {
      setFilePath(path);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Selecciona tu archivo .sqlite</h2>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
        onClick={handleSelectFile}
      >
        Seleccionar archivo
      </button>

      {filePath && (
        <p className="mt-4 text-gray-700">
          <strong>Ruta seleccionada:</strong> {filePath}
        </p>
      )}
    </div>
  );
}

export default SQLiteFileSelector;
