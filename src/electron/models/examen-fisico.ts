import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export class ExamenFisico extends Model {}

ExamenFisico.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    arterialPressure: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cardiacFrecuency: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    respiratorRate: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    temperature: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    abdominalcircunference: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    oxygensaturation: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "ExamenFisico",
    timestamps: true,
    underscored: true,
  }
);
