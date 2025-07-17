import { sequelize } from "./db.js";
import { make_relations } from "../models/relaciones.js";

//Función que crea la conección con la base de datos
export async function connectDB() {
  //Creamos la base de datos en /database y nos conectamos a ella
  try {
    make_relations();
    await sequelize.sync(); //{ alter: true });
    console.log("Connection has been established successfully.");
    console.log("Relations has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
