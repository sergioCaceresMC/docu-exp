import { ipcRenderer } from "electron";

const electron = require("electron");

electron.contextBridge.exposeInMainWorld("paciente", {
  //Paciente
  getPacientes: async () => await ipcRenderer.invoke("getPacientes"),

  getPacienteById: async (id: string) =>
    await ipcRenderer.invoke("getPacienteById", { id }),

  getPacienteByBirth: async (from: Date, to: Date) =>
    await ipcRenderer.invoke("getPacienteByBirth", { from, to }),

  createPaciente: async (data: any) =>
    await ipcRenderer.invoke("createPaciente", { data }),

  updatePaciente: async (id: string, data: any) =>
    await ipcRenderer.invoke("updatePaciente", { id, data }),

  deletePaciente: async (id: string) =>
    await ipcRenderer.invoke("deletePaciente", { id }),
});

electron.contextBridge.exposeInMainWorld("antecedentes", {
  // ==================== VACUNAS =====================
  getVacunaById: async (id: string) =>
    await ipcRenderer.invoke("getVacunaById", { id }),

  getVacunasByPaciente: async (id: string) =>
    await ipcRenderer.invoke("getVacunasByPaciente", { id }),

  getVacunasByPacienteAndDate: async (id: string, from: Date, to: Date) =>
    await ipcRenderer.invoke("getVacunasByPacienteAndDate", {
      id,
      from,
      to,
    }),

  createVacuna: async (id: string, data: any) =>
    await ipcRenderer.invoke("createVacuna", { id, data }),

  updateVacunaById: async (id: string, data: any) =>
    await ipcRenderer.invoke("updateVacuna", { id, data }),

  deleteVacunaById: async (id: string) =>
    await ipcRenderer.invoke("deleteVacuna", { id }),

  // ==================== ALERGIAS =====================
  getAlergiaById: async (id: string) =>
    await ipcRenderer.invoke("getAlergiaById", { id }),

  getAlergiasByPaciente: async (id: string) =>
    await ipcRenderer.invoke("getAlergiasByPaciente", { id }),

  getAlergiasByPacienteAndDate: async (id: string, from: Date, to: Date) =>
    await ipcRenderer.invoke("getAlergiasByPacienteAndDate", {
      id,
      from,
      to,
    }),

  createAlergia: async (id: string, data: any) =>
    await ipcRenderer.invoke("createAlergia", { id, data }),

  updateAlergiaById: async (id: string, data: any) =>
    await ipcRenderer.invoke("updateAlergia", { id, data }),

  deleteAlergiaById: async (id: string) =>
    await ipcRenderer.invoke("deleteAlergia", { id }),

  // ==================== ENFERMEDADES =====================

  getEnfermedadById: async (id: string) =>
    await ipcRenderer.invoke("getEnfermedadById", { id }),

  getEnfermedadesPaciente: async (id: string) =>
    await ipcRenderer.invoke("getEnfermedadesByPaciente", { id }),

  getEnfermedadesByPacienteAndDate: async (id: string, from: Date, to: Date) =>
    await ipcRenderer.invoke("getEnfermedadesByPacienteAndDate", {
      id,
      from,
      to,
    }),

  createEnfermedad: async (id: string, data: any) =>
    await ipcRenderer.invoke("createEnfermedad", { id, data }),

  updateEnfermedadById: async (id: string, data: any) =>
    await ipcRenderer.invoke("updateEnfermedad", { id, data }),

  deleteEnfermedadById: async (id: string) =>
    await ipcRenderer.invoke("deleteEnfermedad", { id }),

  // ==================== FAMILIARES =====================

  getFamiliarById: async (id: string) =>
    await ipcRenderer.invoke("getFamiliarById", { id }),

  createFamiliar: async (data: any) =>
    await ipcRenderer.invoke("createFamiliar", { data }),

  updateFamiliarById: async (id: string, data: any) =>
    await ipcRenderer.invoke("updateFamiliar", { id, data }),

  deleteFamiliarById: async (id: string) =>
    await ipcRenderer.invoke("deleteFamiliar", { id }),

  // ==================== CIRUGÍAS =====================

  getCirugiaById: async (id: string) =>
    await ipcRenderer.invoke("getCirugiaById", { id }),

  getCirugiasPaciente: async (id: string) =>
    await ipcRenderer.invoke("getCirugiasByPaciente", { id }),

  getCirugiasByPacienteAndDate: async (id: string, from: Date, to: Date) =>
    await ipcRenderer.invoke("getCirugiasByPacienteAndDate", {
      id,
      from,
      to,
    }),

  createCirugia: async (id: string, data: any) =>
    await ipcRenderer.invoke("createCirugia", { id, data }),

  updateCirugiaById: async (id: string, data: any) =>
    await ipcRenderer.invoke("updateCirugia", { id, data }),

  deleteCirugiaById: async (id: string) =>
    await ipcRenderer.invoke("deleteCirugia", { id }),
});

electron.contextBridge.exposeInMainWorld("consulta", {
  getConsultaById: async (id: string) =>
    await ipcRenderer.invoke("getConsultaById", { id }),

  getConsultaByPaciente: async (id: string) =>
    await ipcRenderer.invoke("getConsultaByPaciente", { id }),

  getConsultaByPacienteAndDate: async (id: string, from: Date, to: Date) =>
    await ipcRenderer.invoke("getConsultaByPacienteAndDate", { id, from, to }),

  getControlesByConsulta: async (id: string) =>
    await ipcRenderer.invoke("getControlesByConsulta", { id }),

  getControlesByPacienteAndDate: async (id: string, from: Date, to: Date) =>
    await ipcRenderer.invoke("getControlesByPacienteAndDate", { id, from, to }),

  getControlesByConsultaAndDate: async (id: string, from: Date, to: Date) =>
    await ipcRenderer.invoke("getControlesByConsultaAndDate", { id, from, to }),

  createConsultaByPaciente: async (id: string, data: any) =>
    await ipcRenderer.invoke("createConsultaByPaciente", { id, data }),

  createConstrolByConsulta: async (id: string, data: any) =>
    await ipcRenderer.invoke("createConstrolByConsulta", { id, data }),

  updateConsultaById: async (id: string, data: any) =>
    ipcRenderer.invoke("updateConsultaById", { id, data }),

  deleteConsultaById: async (id: string) =>
    ipcRenderer.invoke("deleteConsultaById", { id }),
});

electron.contextBridge.exposeInMainWorld("diagnostico", {
  getDiagnosticoById: async (id: string) =>
    await ipcRenderer.invoke("getDiagnosticoById", { id }),

  getDiagnosticosByPaciente: async (id: string) =>
    await ipcRenderer.invoke("getDiagnosticosByPaciente", { id }),

  getDiagnosticoByConsulta: async (id: string) =>
    await ipcRenderer.invoke("getDiagnosticosByConsulta", { id }),

  getDiagnosticosByPacienteAndDate: async (id: string, from: Date, to: Date) =>
    await ipcRenderer.invoke("getDiagnosticosByPacienteAndDate", {
      id,
      from,
      to,
    }),

  createDiagnostico: async (id: string, data: any) =>
    await ipcRenderer.invoke("createDiagnostico", { id, data }),

  updateDiagnostico: async (id: string, data: any) =>
    await ipcRenderer.invoke("updateDiagnostico", { id, data }),

  deleteDiagnostico: async (id: string) =>
    await ipcRenderer.invoke("deleteDiagnostico", { id }),
});

electron.contextBridge.exposeInMainWorld("tratamiento", {
  getTratamientoById: async (id: string) =>
    await ipcRenderer.invoke("getTratamientoById", { id }),

  getTratamientosByPaciente: async (id: string) =>
    await ipcRenderer.invoke("getTratamientosByPaciente", { id }),

  getTratamientosByConsulta: async (id: string) =>
    await ipcRenderer.invoke("getTratamientosByConsulta", { id }),

  getTratamientosByPacienteAndDate: async (id: string, from: Date, to: Date) =>
    await ipcRenderer.invoke("getTratamientosByPacienteAndDate", {
      id,
      from,
      to,
    }),

  createTratamiento: async (id: string, data: any) =>
    await ipcRenderer.invoke("createTratamiento", { id, data }),

  updateTratamiento: async (id: string, data: any) =>
    await ipcRenderer.invoke("updateTratamiento", { id, data }),

  deleteTratamiento: async (id: string) =>
    await ipcRenderer.invoke("deleteTratamiento", { id }),
});

electron.contextBridge.exposeInMainWorld("exFisico", {
  getExFisicoById: async (id: string) =>
    await ipcRenderer.invoke("getExFisicoById", { id }),

  getExFisicoByConsulta: async (id: string) =>
    await ipcRenderer.invoke("getExFisicoByConsulta", { id }),

  createExFisicoByConsulta: async (id: string, data: any) =>
    await ipcRenderer.invoke("createExFisicoByConsulta", { id, data }),

  updateExFisicoByConsulta: async (id: string, data: any) =>
    await ipcRenderer.invoke("updateExFisicoByConsulta", { id, data }),

  deleteExFisicoByConsulta: async (id: string) =>
    await ipcRenderer.invoke("deleteExFisicoByConsulta", { id }),
});

electron.contextBridge.exposeInMainWorld("exLaboratorio", {
  getLaboratorioById: async (id: string) =>
    await ipcRenderer.invoke("getLaboratorioById", { id }),

  getLaboratoriosByPaciente: async (id: string) =>
    await ipcRenderer.invoke("getLaboratoriosByPaciente", { id }),

  getLaboratoriosByPacienteAndDate: async (id: string, from: Date, to: Date) =>
    await ipcRenderer.invoke("getLaboratoriosByPacienteAndDate", {
      id,
      from,
      to,
    }),

  createLaboratorioByPaciente: async (id: string, data: any) =>
    await ipcRenderer.invoke("createLaboratorioByPaciente", { id, data }),

  updateLaboratorio: async (id: string, data: any) =>
    await ipcRenderer.invoke("updateLaboratorio", { id, data }),

  deleteLaboratorio: async (id: string) =>
    await ipcRenderer.invoke("deleteLaboratorio", { id }),

  createFileByLaboratorio: async (id: string, data: any) =>
    await ipcRenderer.invoke("createFileByLaboratorio", { id, data }),

  updateFile: async (id: string, data: any) =>
    await ipcRenderer.invoke("updateFile", { id, data }),

  deleteFile: async (id: string) =>
    await ipcRenderer.invoke("deleteFile", { id }),
});

electron.contextBridge.exposeInMainWorld("electronAPI", {
  selectSQLiteFile: () => ipcRenderer.invoke("select-sqlite-file"),

  openFile: (
    absolutePath: string
  ): Promise<{ success: boolean; error?: string }> =>
    ipcRenderer.invoke("open-file", absolutePath),

  selectFileAndCreate: (labId: string) =>
    ipcRenderer.invoke("select-file-and-save", labId),

  selectFileAndUpdate: (fileId: string) =>
    ipcRenderer.invoke("select-file-and-update", fileId),

  selectFile: () => ipcRenderer.invoke("select-any-file"),

  selectDB: () => ipcRenderer.invoke("select-database"),

  exportDB: () => ipcRenderer.invoke("export-database"),
});
