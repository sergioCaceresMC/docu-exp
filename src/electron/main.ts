import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./util.js";
import { connectDB } from "./database/conection.js";
import { getPreloadPath } from "./pathResolver.js";
import { registerIpcPaciente } from "./ipc-controllers/ipc-paciente.js";
import { registerIpcAntecedentes } from "./ipc-controllers/ipc-antecedentes.js";
import { registerIpcConsulta } from "./ipc-controllers/ipc-consulta.js";
import { registerIpcDiagnostico } from "./ipc-controllers/ipc-diagnostico.js";
import { registerIpcExFisico } from "./ipc-controllers/ipc-examen-fisico.js";
import { registerIpcExLaboratorio } from "./ipc-controllers/ipc-examen-laboratorio.js";
import { registerIpcTratamiento } from "./ipc-controllers/ipc-tratamiento.js";
import { registerIpcApi } from "./ipc-controllers/ipc-api.js";

app.on("ready", async () => {
  const mainWindow = new BrowserWindow({
    minWidth: 770, // ancho mínimo
    minHeight: 300,
    webPreferences: {
      preload: getPreloadPath(),
    },
  });
  try {
    connectDB();
  } catch (error) {
    console.log(error);
  }

  registerIpcApi();
  registerIpcPaciente();
  registerIpcAntecedentes();
  registerIpcConsulta();
  registerIpcDiagnostico();
  registerIpcExFisico();
  registerIpcExLaboratorio();
  registerIpcTratamiento();

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }
});
