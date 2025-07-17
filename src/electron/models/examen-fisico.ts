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
      type: DataTypes.FLOAT,
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
  },
  {
    sequelize,
    modelName: "ExamenFisico",
    timestamps: true,
    underscored: true,
  }
);
