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
