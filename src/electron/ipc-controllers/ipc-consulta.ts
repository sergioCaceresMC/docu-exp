import { ipcMain } from "electron";
import * as consulta from "../controllers/consulta-controller.js";

export function registerIpcConsulta() {
  ipcMain.handle("getConsultaById", async (event, { id }) => {
    const controles = await consulta.get_consulta_by_id(id);
    return controles.dataValues;
  });

  ipcMain.handle("getConsultaByPaciente", async (event, { id }) => {
    const controles = await consulta.get_consultas_by_paciente(id);
    return controles.map((p) => p.toJSON());
  });

  //Consultas por paciente y fecha
  ipcMain.handle(
    "getConsultaByPacienteAndDate",
    async (event, { id, from, to }) => {
      const pacientes = await consulta.get_consultas_by_paciente_and_date(
        id,
        from,
        to
      );
      return pacientes.map((p) => p.toJSON()); // Sequelize devuelve objetos, esto lo serializa
    }
  );

  ipcMain.handle("getControlesByConsulta", async (event, { id }) => {
    const controles = await consulta.get_controles_by_consulta(id);
    return controles.map((p) => p.toJSON());
  });

  //Controles por paciente y fecha
  ipcMain.handle(
    "getControlesByPacienteAndDate",
    async (event, { id, from, to }) => {
      const controles = await consulta.get_controles_by_paciente_and_date(
        id,
        from,
        to
      );
      return controles.map((p) => p.toJSON());
    }
  );

  //Constroles por consulta y fecha
  ipcMain.handle(
    "getControlesByConsultaAndDate",
    async (event, { id, from, to }) => {
      const controles = await consulta.get_controles_by_consulta_and_date(
        id,
        from,
        to
      );
      return controles.map((p) => p.toJSON());
    }
  );

  ipcMain.handle("createConsultaByPaciente", async (event, { id, data }) => {
    const controles = await consulta.create_consulta_by_paciente(id, data);
    return controles.dataValues;
  });

  ipcMain.handle("createConstrolByConsulta", async (event, { id, data }) => {
    const controles = await consulta.create_control_by_consulta(id, data);
    //@ts-ignore
    return controles.dataValues;
  });

  ipcMain.handle("updateConsultaById", async (event, { id, data }) => {
    const controles = await consulta.update_consulta_by_id(id, data);
    return controles;
  });

  ipcMain.handle("deleteConsultaById", async (event, { id }) => {
    const controles = await consulta.delete_consulta_by_id(id);
    return controles;
  });
}
