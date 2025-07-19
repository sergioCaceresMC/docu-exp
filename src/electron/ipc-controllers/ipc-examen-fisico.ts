import { ipcMain } from "electron";
import * as exfisico from "../controllers/examen-fisico-controller.js";

export function registerIpcExFisico() {
  ipcMain.handle("getExFisicoById", async (event, { id }) => {
    return (await exfisico.get_ex_fisico_by_id(id)).dataValues;
  });

  ipcMain.handle("getExFisicoByConsulta", async (event, { id }) => {
    const tratamientos = await exfisico.get_ex_fisico_by_consulta(id);
    return tratamientos?.dataValues;
  });

  ipcMain.handle("createExFisicoByConsulta", async (event, { id, data }) => {
    const tratamientos = await exfisico.create_ex_fisico_by_consulta(id, data);
    return tratamientos?.dataValues;
  });

  ipcMain.handle("updateExFisicoByConsulta", async (event, { id, data }) => {
    const tratamientos = await exfisico.update_ex_fisico(id, data);
    return tratamientos?.dataValues;
  });

  ipcMain.handle("deleteExFisicoByConsulta", async (event, { id }) => {
    const tratamientos = await exfisico.delete_ex_fisico(id);
    return tratamientos;
  });
}
