import { SquarePlus } from "lucide-react"; // o cualquier otro icono que uses

type Boton = {
  funcion: () => void;
  text: string;
};

export function BotonAgregar({ text = "Nueva consulta", funcion }: Boton) {
  return (
    <button
      onClick={funcion}
      className="fixed cursor-pointer bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white  p-3 shadow-lg transition duration-300 ease-in-out z-35 hover:scale-110 rounded-xl flex"
      aria-label="Agregar"
      title={text}
    >
      <SquarePlus className="w-6 h-6" />
      <p className="pl-2">{text}</p>
    </button>
  );
}
