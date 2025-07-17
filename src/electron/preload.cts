import { ipcRenderer } from "electron";

const electron = require("electron");

// Exponer funciones al renderer
electron.contextBridge.exposeInMainWorld("electron", {
  //Paciente
  obtenerPacientes: async () => await ipcRenderer.invoke("obtenerpacientes"),
  actualizarPaciente: async (id: string, data: any) =>
    await ipcRenderer.invoke("actualizar-paciente", { id, data }),

  //...
  getStaticData: () => console.log("static"),
});
