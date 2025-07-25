import { app, dialog, ipcMain, shell } from "electron";
import fs from "fs";
import path from "path";

import { connectDB } from "../database/conection.js";
import { route } from "../database/db.js";
import {
  create_file_by_laboratorio,
  update_file,
} from "../controllers/examen-laboratorio-controller.js";

//create_file_by_laboratorio(id, data)
//data {name (string de máximo 250), direction (text)}
//El name es el nombre del archivo con su extensión

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

  ipcMain.handle("select-file-and-save", async (event, laboratorioId) => {
    try {
      const result = await dialog.showOpenDialog({
        properties: ["openFile"],
        filters: [],
      });

      if (result.canceled || result.filePaths.length === 0) return null;

      const filePath = result.filePaths[0];
      const fileName = path.basename(filePath); // nombre con extensión

      // Guardar en base de datos
      await create_file_by_laboratorio(laboratorioId, {
        name: fileName,
        direction: filePath,
      });

      return { success: true, name: fileName, direction: filePath };
    } catch (error) {
      console.error("Error al guardar archivo en DB:", error);
      //@ts-ignore
      return { success: false, error: error.message };
    }
  });

  ipcMain.handle("select-file-and-update", async (event, fileId) => {
    try {
      const result = await dialog.showOpenDialog({
        properties: ["openFile"],
        filters: [],
      });

      if (result.canceled || result.filePaths.length === 0) return null;

      const filePath = result.filePaths[0];
      const fileName = path.basename(filePath); // nombre con extensión

      // Actualizar en base de datos
      await update_file(fileId, {
        name: fileName,
        direction: filePath,
      });

      return { success: true, name: fileName, direction: filePath };
    } catch (error) {
      console.error("Error al actualizar archivo en DB:", error);
      //@ts-ignore
      return { success: false, error: error.message };
    }
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

  ipcMain.handle("open-file", async (_event, absolutePath: string) => {
    try {
      if (!path.isAbsolute(absolutePath)) {
        throw new Error("La ruta no es absoluta");
      }

      if (!fs.existsSync(absolutePath)) {
        throw new Error("El archivo no existe");
      }

      const result = await shell.openPath(absolutePath);
      if (result) {
        throw new Error(result);
      }

      return { success: true };
    } catch (error) {
      console.error("Error al abrir el archivo:", error);
      return { success: false, error: (error as Error).message };
    }
  });
}
