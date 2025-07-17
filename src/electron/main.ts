import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./util.js";
import { connectDB } from "./database/conection.js";
import { getPreloadPath } from "./pathResolver.js";
import { registerIpcPaciente } from "./ipc-controllers/ipc-paciente.js";

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

  registerIpcPaciente();

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }
});
