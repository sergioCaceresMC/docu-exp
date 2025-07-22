import { LogOut, Database, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function SidebarMenu({ currentView }: { currentView: string }) {
  const navigate = useNavigate();
  const open: boolean = true;

  const navItems = [
    {
      label: "Pacientes",
      icon: <Users />,
      view: "pacientes",
      path: "/",
    },
    {
      label: "Base de datos",
      icon: <Database />,
      view: "database",
      path: "/database",
    },
    {
      label: "Salir",
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
            title={item.label}
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
