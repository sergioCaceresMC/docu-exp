import { ipcMain } from "electron";
import * as paciente from "../controllers/paciente-controller.js";

export function registerIpcPaciente() {
  // Escuchar el pedido desde el render
  ipcMain.handle("getPacientes", async () => {
    const pacientes = await paciente.get_pacientes();
    return pacientes.map((p) => p.toJSON()); // Sequelize devuelve objetos, esto lo serializa
  });

  ipcMain.handle("getPacienteById", async (event, { id }) => {
    return (await paciente.get_paciente(id)).dataValues;
  });

  ipcMain.handle("getPacienteByBirth", async (event, { from, to }) => {
    const pacientes = await paciente.get_pacientes_by_birthday(from, to);
    return pacientes.map((p) => p.toJSON());
  });

  ipcMain.handle("createPaciente", async (event, { data }) => {
    return (await paciente.create_paciente(data)).dataValues;
  });

  ipcMain.handle("updatePaciente", async (event, { id, data }) => {
    return await paciente.update_paciente_by_id(id, data);
  });

  ipcMain.handle("deletePaciente", async (event, { id }) => {
    return await paciente.delete_paciente_by_id(id);
  });
}
