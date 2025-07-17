import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./util.js";
import { connectDB } from "./database/conection.js";
import { seed1 } from "./seeders/seed1.js";
import { seed2 } from "./seeders/seed2.js";

app.on("ready", async () => {
  const mainWindow = new BrowserWindow({});
  try {
    connectDB();
    //seed1();
    //seed2();
  } catch (error) {
    console.log(error);
  }

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }
});
