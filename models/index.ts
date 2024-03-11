import { DataTypes, Sequelize } from 'sequelize';
import { config } from '../config';
import { DataTypeAbstract, ModelAttributeColumnOptions } from 'sequelize';
import { User } from './User';
import { Address } from './Address';
import { Ship } from './ship';
import { Mission } from './mission';

declare global {
  type SequelizeAttributes<T extends { [key: string]: any }> = {
    [P in keyof T]: string | DataTypeAbstract | ModelAttributeColumnOptions;
  };
}

const sequelize = new Sequelize({
  ...config.mysql,
  dialect: 'mysql',
  define: {
    charset: 'utf8mb4',
  },
  logging: false,
  pool: {
    acquire: 30000,
  },
});

// Initialize models
const userModel = User.initModel(sequelize);
const addressModel = Address.initModel(sequelize);
const shipModel = Ship.initModel(sequelize);
const missionModel = Mission.initModel(sequelize);

const ShipMissions = sequelize.define('ShipMissions', {
  shipId: {
    type: DataTypes.UUID,
    references: {
      model: Ship,
      key: 'id',
    },
  },
  missionId: {
    type: DataTypes.UUID,
    references: {
      model: Mission,
      key: 'id',
    },
  },
}, {
  timestamps: false, // You can enable timestamps if you want
});

// Set up associations
shipModel.belongsToMany(missionModel, { through: ShipMissions, foreignKey: 'shipId' });
missionModel.belongsToMany(shipModel, { through: ShipMissions, foreignKey: 'missionId' });

// Combine models into a db object
const db = {
  sequelize,
  User: userModel,
  Address: addressModel,
  Ship: shipModel,
  Mission: missionModel,
};

Object.keys(db).map(key => {
  if (db[key].associate) {
    db[key].associate(db);
  }
});

const sync = async () => {
  await sequelize.sync({ force: false });
};

export { sync, db, sequelize };
