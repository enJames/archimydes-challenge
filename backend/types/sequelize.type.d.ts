import type {
  Sequelize,
  Model,
  ModelStatic,
  DataTypes,
  Optional,
  QueryInterface,
  WhereOptions,
  Transaction
} from 'sequelize';

declare global {
  type SequelizeWhereOptions = WhereOptions;
  type SequelizeModel = Model;
  type SequelizeTransaction = Transaction;
}
