import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";

export const User = sequelize.define('user', {
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
})