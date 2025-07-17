import { Model, DataTypes, HasManyGetAssociationsMixin } from "sequelize";
import { sequelize } from "../database/db.js";
import { Consulta } from "./consulta.js";
import { Laboratorio } from "./examen-laboratorio.js";
import { Vacuna, Alergia, Cirugia, Enfermedad } from "./antecedentes.js";

export class Paciente extends Model {
  public getConsultas!: HasManyGetAssociationsMixin<Consulta>;
  public getLaboratorios!: HasManyGetAssociationsMixin<Laboratorio>;
  public getVacunas!: HasManyGetAssociationsMixin<Vacuna>;
  public getAlergias!: HasManyGetAssociationsMixin<Alergia>;
  public getCirugias!: HasManyGetAssociationsMixin<Cirugia>;
  public getEnfermedads!: HasManyGetAssociationsMixin<Enfermedad>;
}

Paciente.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    dui: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Paciente",
    timestamps: true,
    underscored: true,
  }
);
