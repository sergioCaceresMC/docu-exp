import { ipcMain } from "electron";
import * as exlaboratorio from "../controllers/examen-laboratorio-controller.js";

export function registerIpcExLaboratorio() {
  ipcMain.handle("getLaboratorioById", async (event, { id }) => {
    return (await exlaboratorio.get_laboratorio_by_id(id)).dataValues;
  });

  ipcMain.handle("getLaboratoriosByPaciente", async (event, { id }) => {
    const tratamientos = await exlaboratorio.get_laboratorios_by_paciente(id);
    return tratamientos.map((p) => p.toJSON());
  });

  ipcMain.handle(
    "getLaboratoriosByPacienteAndDate",
    async (event, { id, from, to }) => {
      const tratamientos =
        await exlaboratorio.get_laboratorios_by_paciente_and_date(id, from, to);
      return tratamientos.map((p) => p.toJSON());
    }
  );

  ipcMain.handle("createLaboratorioByPaciente", async (event, { id, data }) => {
    const tratamientos = await exlaboratorio.create_laboratorio_by_pacient(
      id,
      data
    );
    return tratamientos;
  });

  ipcMain.handle("updateLaboratorio", async (event, { id, data }) => {
    const tratamientos = await exlaboratorio.update_laboratorio(id, data);
    return tratamientos;
  });

  ipcMain.handle("deleteLaboratorio", async (event, { id }) => {
    const tratamientos = await exlaboratorio.delete_laboratorio(id);
    return tratamientos;
  });

  ipcMain.handle("createFileByLaboratorio", async (event, { id, data }) => {
    const tratamientos = await exlaboratorio.create_file_by_laboratorio(
      id,
      data
    );
    return tratamientos;
  });

  ipcMain.handle("updateFile", async (event, { id, data }) => {
    const tratamientos = await exlaboratorio.update_file(id, data);
    return tratamientos;
  });

  ipcMain.handle("deleteFile", async (event, { id }) => {
    const tratamientos = await exlaboratorio.delete_file(id);
    return tratamientos;
  });
}
