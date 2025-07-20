import { dialog, ipcMain } from "electron";
import fs from "fs";
import { connectDB } from "../database/conection.js";
import { route } from "../database/db.js";
import path from "path";

export function registerIpcApi() {
  ipcMain.handle("select-sqlite-file", async () => {
    const result = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [{ name: "SQLite DB", extensions: ["sqlite", "db"] }],
    });

    if (result.canceled || result.filePaths.length === 0) return null;

    return result.filePaths[0]; // ruta absoluta del archivo
  });

  ipcMain.handle("select-any-file", async () => {
    const result = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [],
    });

    if (result.canceled || result.filePaths.length === 0) return null;

    return result.filePaths[0]; // ruta absoluta del archivo
  });

  ipcMain.handle("select-database", async () => {
    const old_route = route;

    // 1. Mostrar diálogo para seleccionar archivo .sqlite
    const result = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [{ name: "SQLite DB", extensions: ["sqlite", "db"] }],
    });

    if (result.canceled || result.filePaths.length === 0) return null;

    const selectedPath = result.filePaths[0];

    try {
      // 2. Sustituir la base de datos actual por la copia del archivo seleccionado
      fs.copyFileSync(selectedPath, old_route);

      // 3. Reconectar la base de datos
      connectDB();

      return old_route; // Opcional: puedes devolver la ruta usada
    } catch (error) {
      console.error("Error al sustituir la base de datos:", error);
      return null;
    }
  });

  ipcMain.handle("export-database", async (): Promise<string | null> => {
    // Mostrar diálogo para seleccionar una carpeta destino
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory", "createDirectory"],
    });

    if (result.canceled || result.filePaths.length === 0) {
      return null;
    }

    const targetDir: string = result.filePaths[0];
    const dbFileName: string = path.basename(route); // ejemplo: database.sqlite
    const targetPath: string = path.join(targetDir, dbFileName);

    try {
      fs.copyFileSync(route, targetPath);
      console.log(`Base de datos exportada a: ${targetPath}`);
      return targetPath;
    } catch (error) {
      console.error("Error al exportar la base de datos:", error);
      return null;
    }
  });
}
