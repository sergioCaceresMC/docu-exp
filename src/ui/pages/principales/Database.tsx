import { SidebarMenu } from "../../components/Layout/SidebarMenu";

export function DataBase() {
  return (
    <>
      <SidebarMenu currentView="database" />
      <div className="ml-20 lg:ml-50 mt-0 h-full p-10">
        <h1 className="text-2xl">Ajustes de la base de datos</h1>
      </div>
    </>
  );
}
