import { Sequelize, DataTypes, DatabaseModels, Model } from "../interfaces";

const user = (sequelize: Sequelize, DataTypes: DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    emailAddress: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM("Admin", "User"),
      allowNull: false
    },
  }, { paranoid: true });

  return User;
};

export default {
  modelDefinition: user,
  associate: (currentModel: Model, models: DatabaseModels) => {},
  addScopes: (currentModel: Model, models: DatabaseModels) => {},
  addHooks: (currentModel: Model, models: DatabaseModels) => {}
}

