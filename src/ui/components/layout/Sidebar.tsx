import {
  User,
  IdCard,
  TestTube,
  Stethoscope,
  ClipboardCheck,
  SquareActivity,
  PillBottle,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Sidebar({ currentView }: { currentView: string }) {
  const navigate = useNavigate();
  const open: boolean = true;

  const navItems = [
    { label: "Paciente", icon: <User />, view: "paciente", path: "/paciente" },
    {
      label: "Laboratorios",
      icon: <TestTube />,
      view: "laboratorio",
      path: "/laboratorios",
    },
    {
      label: "Consultas",
      icon: <Stethoscope />,
      view: "consulta",
      path: "/consultas",
    },
    {
      label: "Controles",
      icon: <ClipboardCheck />,
      view: "control",
      path: "/controles",
    },
    {
      label: "Diagnosticos",
      icon: <SquareActivity />,
      view: "diagnostico",
      path: "/diagnosticos",
    },
    {
      label: "Tratamientos",
      icon: <PillBottle />,
      view: "tratamiento",
      path: "/tratamientos",
    },
    {
      label: "Menu Principal",
      icon: <LogOut />,
      view: "menu",
      path: "/",
    },
  ];

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-auto left-0 h-full bg-green-600 text-white shadow-lg transition-transform z-40 
         lg:w-50 w-19 p-4 flex flex-col gap-4
        ${open ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              navigate(item.path);
            }}
            className={`${
              currentView === item.view ? "bg-green-700" : ""
            } flex hover:cursor-pointer items-center gap-3 p-2 hover:bg-green-700 rounded transition`}
          >
            {item.icon}
            <span className=" hidden lg:inline-block">{item.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}
