import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../Alertas/AlertProp";

export function NewPacienteForm() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [dui, setDui] = useState("");
  const [telefono, setTelefono] = useState("");
  const [sexo, setSexo] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [direccion, setDireccion] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [alerta, setAlerta] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  async function savePaciente(e: any) {
    e?.preventDefault?.();

    if (!dui.trim()) {
      setAlerta({ type: "error", message: "El campo DUI está vacío" });
      return;
    }
    if (!nombre.trim()) {
      setAlerta({ type: "error", message: "El campo Nombre está vacío" });
      return;
    }
    if (!sexo.trim()) {
      setAlerta({ type: "error", message: "El campo Sexo está vacío" });
      return;
    }
    if (!fechaNacimiento.trim()) {
      setAlerta({
        type: "error",
        message: "El campo Fecha de nacimiento está vacío",
      });
      return;
    }
    try {
      const data = {
        name: nombre.trim(),
        dui: dui.trim(),
        phone: telefono.trim(),
        gender: sexo.trim(),
        address: direccion.trim(),
        birthday: new Date(fechaNacimiento),
      };

      //@ts-ignore
      const paciente = await window.paciente.createPaciente(data);

      if (!paciente || !paciente.id) {
        setAlerta({
          type: "error",
          message: "Error al conectar con la base de datos. Revisa la conexión",
        });
        return;
      }

      setAlerta({ type: "success", message: "El paciente se ha creado" });

      sessionStorage.setItem("id_paciente", paciente.id);
      navigate(`/paciente`);
    } catch (error) {
      console.error("Error al crear el paciente:", error);
      setAlerta({ type: "error", message: "Ha ocurrido un error inesperado" });
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

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2 bg-teal-500 font-semibold text-white text-2xl flex justify-between rounded-t-lg hover:bg-teal-600 transition hover:cursor-pointer ${
          isOpen ? " mt-0" : "rounded-b-lg mb-15  mt-15"
        }`}
      >
        Nuevo paciente
        <ChevronDown className={isOpen ? "hidden" : "size-8"} />
        <ChevronUp className={isOpen ? "size-8" : "hidden"} />
      </button>

      <div
        className={`text-gray-400 w-full border-2 border-t-0 border-teal-500 bg-transparent hover:text-gray-900 rounded-b-lg text-sm p-1 ml-auto items-center mb-5 ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div className="p-5 space-y-6 mx-auto">
          <div className="grid sm:grid-cols-9 md:grid-cols-12 lg:grid-cols-12 gap-6 lg:gap-5">
            <div className="col-span-9 sm:col-span-5 md:col-span-6 lg:col-span-6">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Nombre completo
              </label>
              <input
                type="text"
                value={nombre}
                maxLength={100}
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="Ingrese el nombre..."
              />
            </div>

            <div className="col-span-9 sm:col-span-4 md:col-span-6 lg:col-span-6">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                DUI
              </label>
              <input
                type="text"
                value={dui}
                maxLength={20}
                onChange={(e) => {
                  setDui(e.target.value);
                }}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="Ingrese la identificación..."
              />
            </div>

            <div className="col-span-9 sm:col-span-3 md:col-span-6 lg:col-span-5 xl:col-span-4">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Teléfono
              </label>
              <input
                type="text"
                value={telefono}
                maxLength={30}
                onChange={(e) => {
                  setTelefono(e.target.value);
                }}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="..."
              />
            </div>

            <div className="col-span-3 sm:col-span-2 lg:col-span-2 xl:col-span-1">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Sexo
              </label>
              <select
                value={sexo}
                onChange={(e) => {
                  setSexo(e.target.value);
                }}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
              >
                <option value="">...</option>
                <option value="F">F</option>
                <option value="M">M</option>
              </select>
            </div>

            <div className="col-span-3 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-2">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Fecha de nacimiento
              </label>
              <input
                type="date"
                value={fechaNacimiento}
                onChange={(e) => {
                  setFechaNacimiento(e.target.value);
                }}
                className="shadow-sm bg-gray-50 sm:text-sm rounded-lg border border-gray-300 focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 text-gray-500"
              />
            </div>

            <div className="col-span-9 md:col-span-12">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Dirección
              </label>
              <input
                value={direccion}
                onChange={(e) => {
                  setDireccion(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                placeholder="..."
              />
            </div>
          </div>

          <div className="pt-5 border-t border-gray-200 rounded-b">
            <button
              className="text-white bg-blue-600 hover:bg-blue-500 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg px-5 py-2 text-center cursor-pointer"
              onClick={savePaciente}
            >
              Crear paciente
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
