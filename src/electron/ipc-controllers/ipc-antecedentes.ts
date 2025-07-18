import { ipcMain } from "electron";
import * as antecedentes from "../controllers/antecedentes-controller.js";

export function registerIpcAntecedentes() {
  //Vacunas
  ipcMain.handle("getVacunasById", async (event, { id }) => {
    return (await antecedentes.get_vacuna_by_id(id)).dataValues;
  });

  ipcMain.handle("getVacunaByPaciente", async (event, { id }) => {
    const vacunas = await antecedentes.get_vacunas_paciente(id);
    return vacunas.map((p) => p.toJSON());
  });

  ipcMain.handle(
    "getVacunasByPacienteAndDate",
    async (event, { id, from, to }) => {
      const vacunas = await antecedentes.get_vacunas_by_paciente_and_date(
        id,
        from,
        to
      );
      return vacunas.map((p) => p.toJSON());
    }
  );

  ipcMain.handle("createVacuna", async (event, { id_paciente, data }) => {
    return await antecedentes.create_vacuna(id_paciente, data);
  });

  ipcMain.handle("updateVacuna", async (event, { id, data }) => {
    const vacuna = await antecedentes.update_vacuna_by_id(id, data);
    return vacuna;
  });

  ipcMain.handle("deleteVacuna", async (event, { id }) => {
    return await antecedentes.delete_vacuna_by_id(id);
  });

  //Alergia
  ipcMain.handle("getAlergiasByPaciente", async (event, { id }) => {
    const alergias = await antecedentes.get_alergias_by_paciente(id);
    return alergias.map((p) => p.toJSON());
  });

  ipcMain.handle("getAlergiaById", async (event, { id }) => {
    const vacunas = await antecedentes.get_vacuna_by_id(id);
    return vacunas.dataValues;
  });

  ipcMain.handle(
    "getAlergiasByPacienteAndDate",
    async (event, { id, from, to }) => {
      const alergias = await antecedentes.get_alergias_by_paciente_and_date(
        id,
        from,
        to
      );
      return alergias.map((p) => p.toJSON());
    }
  );

  ipcMain.handle("createAlergia", async (event, { id_paciente, data }) => {
    const vacunas = await antecedentes.create_alergia(id_paciente, data);
    return vacunas;
  });

  ipcMain.handle("updateAlergia", async (event, { id, data }) => {
    const vacunas = await antecedentes.get_vacunas_paciente(id);
    return vacunas.map((p) => p.toJSON());
  });

  ipcMain.handle("deleteAlergia", async (event, { id }) => {
    const vacunas = await antecedentes.delete_alergia_by_id(id);
    return vacunas;
  });

  //Enfermedad
  ipcMain.handle("getEnfermedadById", async (event, { id }) => {
    const enfermedad = await antecedentes.get_enfermedad_by_id(id);
    return enfermedad.dataValues;
  });

  ipcMain.handle("getEnfermedadesByPaciente", async (event, { id }) => {
    const enfermedades = await antecedentes.get_enfermedades_paciente(id);
    return enfermedades.map((p) => p.toJSON());
  });

  ipcMain.handle(
    "getEnfermedadesByPacienteAndDate",
    async (event, { id, from, to }) => {
      const enfermedades =
        await antecedentes.get_enfermedades_by_paciente_and_date(id, from, to);
      return enfermedades.map((p) => p.toJSON());
    }
  );

  ipcMain.handle("createEnfermedad", async (event, { id, data }) => {
    const enfermedad = await antecedentes.create_enfermedad(id, data);
    return enfermedad.dataValues;
  });

  ipcMain.handle("updateEnfermedad", async (event, { id, data }) => {
    const enfermedad = await antecedentes.update_enfermedad_by_id(id, data);
    return enfermedad;
  });

  ipcMain.handle("deleteEnfermedad", async (event, { id }) => {
    const enfermedad = await antecedentes.delete_enfermedad_by_id(id);
    return enfermedad;
  });

  //Familiar
  ipcMain.handle("getFamiliarById", async (event, { id }) => {
    const familiar = await antecedentes.get_familiar_by_id(id);
    return familiar.dataValues;
  });

  ipcMain.handle("createFamiliar", async (event, { data }) => {
    const familiar = await antecedentes.create_familiar(data);
    return familiar.dataValues;
  });

  ipcMain.handle("updateFamiliar", async (event, { id, data }) => {
    const familiar = await antecedentes.update_familiar_by_id(id, data);
    return familiar;
  });

  ipcMain.handle("deleteFamiliar", async (event, { id }) => {
    const familiar = await antecedentes.delete_familiar_by_id(id);
    return familiar;
  });

  //Cirugia
  ipcMain.handle("getCirugiaById", async (event, { id }) => {
    const cirugia = await antecedentes.get_cirugia_by_id(id);
    return cirugia.dataValues;
  });

  ipcMain.handle("getCirugiasByPaciente", async (event, { id }) => {
    const cirugias = await antecedentes.get_cirugias_paciente(id);
    return cirugias.map((p) => p.toJSON());
  });

  ipcMain.handle(
    "getCirugiasByPacienteAndDate",
    async (event, { id, from, to }) => {
      const cirugias = await antecedentes.get_cirugias_by_paciente_and_date(
        id,
        from,
        to
      );
      return cirugias.map((p) => p.toJSON());
    }
  );

  ipcMain.handle("createCirugia", async (event, { id, data }) => {
    const cirugia = await antecedentes.create_cirugia(id, data);
    return cirugia.dataValues;
  });

  ipcMain.handle("updateCirugia", async (event, { id, data }) => {
    const cirugia = await antecedentes.update_cirugia_by_id(id, data);
    return cirugia;
  });

  ipcMain.handle("deleteCirugia", async (event, { id }) => {
    const cirugia = await antecedentes.delete_cirugia_by_id(id);
    return cirugia;
  });
}
