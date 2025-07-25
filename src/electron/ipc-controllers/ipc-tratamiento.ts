import { ipcMain } from "electron";
import * as tratamiento from "../controllers/tratamiento-controller.js";

export function registerIpcTratamiento() {
  ipcMain.handle("getTratamientoById", async (event, { id }) => {
    return (await tratamiento.get_tratamiento_by_id(id)).dataValues;
  });

  ipcMain.handle("getTratamientosByPaciente", async (event, { id }) => {
    const tratamientos = await tratamiento.get_tratamientos_by_paciente(id);
    return tratamientos.map((p) => p.toJSON());
  });

  ipcMain.handle("getTratamientosByConsulta", async (event, { id }) => {
    const tratamientos = await tratamiento.get_tratamientos_by_consulta(id);
    return tratamientos.map((p) => p.toJSON());
  });

  ipcMain.handle(
    "getTratamientosByPacienteAndDate",
    async (event, { id, from, to }) => {
      const tratamientos =
        await tratamiento.get_tratamientos_by_paciente_and_date(id, from, to);
      return tratamientos.map((p) => p.toJSON());
    }
  );

  ipcMain.handle("createTratamiento", async (event, { id, data }) => {
    const tratamientos = await tratamiento.create_tratamiento(id, data);
    return tratamientos.dataValues;
  });

  ipcMain.handle("updateTratamiento", async (event, { id, data }) => {
    const tratamientos = await tratamiento.update_tratamiento(id, data);
    return tratamientos.dataValues;
  });

  ipcMain.handle("deleteTratamiento", async (event, { id }) => {
    const tratamientos = await tratamiento.delete_tratamiento(id);
    return tratamientos;
  });
}
