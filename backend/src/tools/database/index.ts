import * as Sequelize from 'sequelize';

import connection from './connection';
import { DatabaseModels } from './interfaces';

import user from './models/user';

const modelFunctions = [user];

const databaseModels: DatabaseModels = modelFunctions.reduce((acc, functions) => {
  const model = functions.modelDefinition(connection, Sequelize.DataTypes);
  acc[model.name] = model;
  return acc;
}, {} as any);

modelFunctions.forEach((functions) => {
  const model = functions.modelDefinition(connection, Sequelize.DataTypes);
  const primaryModel = databaseModels[model.name];
  functions.associate(primaryModel, databaseModels) as any;
});

modelFunctions.forEach((functions) => {
  const model = functions.modelDefinition(connection, Sequelize.DataTypes);
  const primaryModel = databaseModels[model.name];
  functions.addScopes(primaryModel, databaseModels);
  functions.addHooks(primaryModel, databaseModels);
});

export default {
  ...databaseModels,
  connection,
  Sequelize
}
