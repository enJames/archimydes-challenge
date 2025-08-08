import * as SequelizeClass from 'sequelize';

export type Model = SequelizeClass.ModelStatic<SequelizeClass.Model>;
declare type sequelizeDataTypes = typeof SequelizeClass.DataTypes;

export interface Sequelize extends SequelizeClass.Sequelize { }

export interface DataTypes extends sequelizeDataTypes { }

export interface DatabaseModels {
  [key: string]: Model;
  User: Model;
}
