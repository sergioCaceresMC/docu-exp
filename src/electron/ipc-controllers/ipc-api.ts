import { dialog, ipcMain } from "electron";

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
}
