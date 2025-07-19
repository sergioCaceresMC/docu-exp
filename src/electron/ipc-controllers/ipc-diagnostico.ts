import { ipcMain } from "electron";
import * as diagnostico from "../controllers/diagnostico-controller.js";

export function registerIpcDiagnostico() {
  ipcMain.handle("getDiagnosticoById", async (event, { id }) => {
    return (await diagnostico.get_diagnostico_by_id(id)).dataValues;
  });

  ipcMain.handle("getDiagnosticosByPaciente", async (event, { id }) => {
    const diagnosticos = await diagnostico.get_diagnosticos_by_paciente(id);
    return diagnosticos.map((p) => p.toJSON());
  });

  ipcMain.handle("getDiagnosticosByConsulta", async (event, { id }) => {
    const diagnosticos = await diagnostico.get_diagnosticos_by_consulta(id);
    return diagnosticos.map((p) => p.toJSON());
  });

  ipcMain.handle(
    "getDiagnosticosByPacienteAndDate",
    async (event, { id, from, to }) => {
      const diagnosticos =
        await diagnostico.get_diagnosticos_by_paciente_and_date(id, from, to);
      return diagnosticos.map((p) => p.toJSON());
    }
  );

  ipcMain.handle("createDiagnostico", async (event, { id, data }) => {
    const diagnosticos = await diagnostico.create_diagnostico(id, data);
    return diagnosticos;
  });

  ipcMain.handle("updateDiagnostico", async (event, { id, data }) => {
    const diagnosticos = await diagnostico.update_diagnostico(id, data);
    return diagnosticos;
  });

  ipcMain.handle("deleteDiagnostico", async (event, { id }) => {
    const diagnosticos = await diagnostico.delete_diagnostico(id);
    return diagnosticos;
  });
}
