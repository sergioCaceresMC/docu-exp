import { ChevronDown, ChevronUp, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function HCardView({
  title,
  notes,
  date,
  prescription = "",
  id,
  path,
}: {
  title: string;
  date: string;
  prescription: string;
  notes: string;
  id: string;
  path: string;
}) {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div id={id} className="flex flex-col shadow-md inset-shadow-2xs  ">
      <div
        className={`flex justify-between px-6 hover:bg-gray-50 items-center ${
          isOpen ? `py-5 ` : `pt-5 pb-3`
        } hover:cursor-pointer`}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <p
          className={`pr-6  text-lg whitespace-nowrap overflow-hidden text-ellipsis ${
            isOpen ? `` : `font-semibold`
          }`}
        >
          {title}
        </p>
        <ChevronDown className={isOpen ? `` : `hidden`} />
        <ChevronUp className={isOpen ? `hidden` : ``} />
      </div>

      <div
        className={
          isOpen ? `hidden` : `px-6 flex flex-col border-t border-gray-200`
        }
      >
        <label className="text-md pt-6 font-semibold text-gray-900 block mb-2">
          Notas
        </label>
        <p className="pb-3  whitespace-wrap overflow-auto text-ellipsis">
          {notes || "--"}
        </p>
        {prescription && prescription !== "" ? (
          <>
            <label className="text-md pt-6 font-semibold text-gray-900 block mb-2">
              Receta
            </label>
            <p className="pb-3  whitespace-wrap overflow-auto text-ellipsis">
              {prescription}
            </p>
          </>
        ) : (
          ""
        )}
        <div className="py-4 flex whitespace-nowrap">
          <button className="px-1 py-1 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-500 transition duration-150 ease-in-out hover:cursor-pointer flex">
            <SquarePen />{" "}
            <span className="hidden lg:inline-block lg:px-2">Editar</span>
          </button>
          <button className="ml-2 px-1 py-1 font-medium text-white bg-[#ff0000] rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-[#ff0000] transition duration-150 ease-in-out flex hover:cursor-pointer">
            <Trash2 />{" "}
            <span className=" hidden lg:inline-block lg:px-2">Eliminar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
