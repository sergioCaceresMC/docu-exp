import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function NewPacienteForm() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [dui, setDui] = useState("");
  const [telefono, setTelefono] = useState("");
  const [sexo, setSexo] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [direccion, setDireccion] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  async function savePaciente(e: any) {
    e?.preventDefault?.();
    // Validaciones básicas
    if (!dui.trim()) {
      alert("El campo DUI está vacío");
      return;
    }

    if (!nombre.trim()) {
      alert("El campo Nombre está vacío");
      return;
    }

    if (!sexo.trim()) {
      alert("El campo Sexo está vacío");
      return;
    }

    if (!fechaNacimiento.trim()) {
      alert("El campo Fecha de nacimiento está vacío");
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
        alert("No se pudo crear el paciente. Intenta nuevamente.");
        return;
      }

      alert("Paciente creado exitosamente");

      sessionStorage.setItem("id_paciente", paciente.id);
      navigate(`/paciente`);
    } catch (error) {
      console.error("Error al crear el paciente:", error);
      alert(
        "Ocurrió un error inesperado al guardar el paciente. Intenta nuevamente."
      );
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2 bg-teal-500 font-semibold text-white flex justify-between 
        rounded-t hover:bg-teal-600 transition hover:cursor-pointer
        ${isOpen ? `` : `rounded-b mb-5`}`}
      >
        {isOpen ? `Nuevo paciente` : `Nuevo paciente`}
        <ChevronDown className={isOpen ? `hidden` : ``} />
        <ChevronUp className={isOpen ? `` : `hidden`} />
      </button>
      <div
        className={`text-gray-400 w-full border-2 border-t-0 border-teal-500 bg-transparent hover:text-gray-900 rounded-b-lg text-sm p-1 ml-auto items-center mb-5  ${
          isOpen ? `` : `hidden`
        }`}
      >
        <div className="p-5 space-y-6 mx-auto">
          <div className="grid sm:grid-cols-9 md:grid-cols-12 lg:grid-cols-12 gap-6 lg:gap-5">
            <div className="col-span-9 sm:col-span-5 md:col-span-6 lg:col-span-6">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                id="product-name"
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
                name="DUI"
                value={dui}
                onChange={(e) => setDui(e.target.value)}
                id="category"
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
                name="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                id="brand"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                placeholder="..."
              />
            </div>
            <div className="col-span-3 sm:col-span-2 lg:col-span-2 xl:col-span-1">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Sexo
              </label>
              <select
                name="sexo"
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
                id="sexo"
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
                name="price"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                id="price"
                className="shadow-sm bg-gray-50 sm:text-sm rounded-lg border border-gray-300 focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 text-gray-500"
              />
            </div>
            <div className="col-span-9 md:col-span-12">
              <label className="text-sm font-medium text-gray-900 block mb-2">
                Dirección
              </label>
              <input
                id="direccion"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4"
                placeholder="..."
              ></input>
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
