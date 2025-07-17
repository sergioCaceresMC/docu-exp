import { Sequelize } from "sequelize";
import path from "path";
import { app } from "electron";

const route: string = path.join(
  app.getAppPath(),
  "/dist-database/database.sqlite"
);

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: route,
});
