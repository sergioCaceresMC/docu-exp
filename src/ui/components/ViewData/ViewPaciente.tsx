import { SquarePen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ConfirmModal } from "../FormsModal/ConfirmModal";
import Alert from "../Alertas/AlertProp";
import { useNavigate } from "react-router-dom";

type FetchFunction = (id: string) => Promise<
  {
    id: string;
    name: string;
    birthday: Date;
    gender: string;
    phone: string;
    address: string;
  }[]
>;

type PacienteData = {
  id: string;
  name: string;
  birthday: Date;
  gender: string;
  dui: string;
  phone: string;
  address: string;
};

export function ViewPaciente() {
  const navigate = useNavigate();
  const paciente = sessionStorage.getItem("id_paciente");
  const [data, setData] = useState<PacienteData>({
    id: "",
    name: "",
    birthday: new Date(),
    dui: "",
    gender: "",
    phone: "",
    address: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [alerta, setAlerta] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!paciente) return;

      try {
        //@ts-ignore
        const dfetch = await window.paciente.getPacienteById(paciente);

        setData(dfetch);
      } catch (error) {
        console.error("Error al obtener datos del paciente:", error);
      }
    };

    fetchData();
  }, [paciente]);

  async function handleDelete() {
    //@ts-ignore
    await window.paciente.deletePaciente(paciente);

    setAlerta({ type: "success", message: "El paciente ha sido borrado" });
    navigate("/");
    setModalOpen(false);
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
        isOpen={modalOpen}
        message="¿Desea borrar el paciente y todos los datos relacionados de forma permanente?"
        onConfirm={handleDelete}
        onCancel={() => setModalOpen(false)}
      />

      <div className="p-5 rounded-2xl inset-shadow-2xs shadow-md">
        <h1 className="text-3xl font-semibold text-gray-800 mb-3">
          {data.name}
        </h1>

        <div className="flex flex-col lg:flex-row lg:gap-10">
          <div className="flex mb-3 gap-2">
            <label className="text-gray-500 text-lg">DUI:</label>
            <p className="text-lg">{data.dui}</p>
          </div>
          <div className="flex mb-3 gap-2">
            <label className="text-gray-500 text-lg">Género:</label>
            <p className="text-lg">{data.gender}</p>
          </div>
          <div className="flex mb-3 gap-2">
            <label className="text-gray-500 text-lg">
              Fecha de nacimiento:
            </label>
            <p className="text-lg">{data.birthday.toDateString()}</p>
          </div>
        </div>
        <div></div>
        <div className="flex gap-2 mb-3">
          <label className="text-gray-500 text-lg">Teléfono:</label>
          <p className="text-lg">{data.phone}</p>
        </div>

        <div className="flex gap-2 mb-3">
          <label className="text-gray-500 text-lg">Dirección:</label>
          <p className="text-lg">{data.address}</p>
        </div>

        <div className=" pt-8 flex whitespace-nowrap">
          <button className="px-3 py-1 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-500 transition duration-150 ease-in-out hover:cursor-pointer flex">
            <SquarePen /> <span className="pl-2">Editar paciente</span>
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="ml-2 px-3 py-1 font-medium text-white bg-[#ff0000] rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-[#ff0000] transition duration-150 ease-in-out flex hover:cursor-pointer"
          >
            <Trash2 /> <span className="pl-2">Borrar paciente</span>
          </button>
        </div>
      </div>
    </>
  );
}
