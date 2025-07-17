import { ipcMain } from "electron";
import * as paciente from "../controllers/paciente-controller.js";

export function registerIpcPaciente() {
  // Escuchar el pedido desde el render
  ipcMain.handle("obtenerpacientes", async () => {
    const pacientes = await paciente.get_pacientes();
    return pacientes.map((p) => p.toJSON()); // Sequelize devuelve objetos, ¡esto se serializa!
  });

  ipcMain.handle("actualizar-paciente", async (event, { id, data }) => {
    return await paciente.update_paciente_by_id(id, data);
  });
}
