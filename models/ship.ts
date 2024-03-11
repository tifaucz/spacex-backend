import { Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, Association } from 'sequelize';
import { Mission } from './mission';

type OmitTypes = '';

class Ship extends Model<
  InferAttributes<
    Ship,
    {
      omit: OmitTypes;
    }
  >,
  InferCreationAttributes<
    Ship,
    {
      omit: OmitTypes;
    }
  >
> {
  declare id: CreationOptional<string>;
  declare class?: string | null;
  declare name?: string | null;
  declare image?: string | null;
  declare active: boolean;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare abs?: number | null;
  declare home_port?: string | null;
  declare imo?: number | null;
  declare mmsi?: number | null;
  declare model?: string | null;
  declare roles?: string[];
  declare status?: string | null;
  declare type?: string | null;
  declare year_built?: number | null;
  declare getMissions: () => Promise<Mission[]>;
  declare addMission: (mission: Mission) => Promise<void>;
  declare addMissions: (missions: Mission[]) => Promise<void>;
  declare missions?: Mission[] | null;

  static associations: {
    missions: Association<Ship, Mission>;
  };

  static initModel(sequelize: Sequelize) {
    Ship.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        class: { type: DataTypes.STRING, allowNull: true },
        name: { type: DataTypes.STRING, allowNull: true },
        image: { type: DataTypes.STRING, allowNull: true },
        active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
        abs: { type: DataTypes.INTEGER, allowNull: true },
        home_port: { type: DataTypes.STRING, allowNull: true },
        imo: { type: DataTypes.INTEGER, allowNull: true },
        mmsi: { type: DataTypes.INTEGER, allowNull: true },
        model: { type: DataTypes.STRING, allowNull: true },
        roles: { type: DataTypes.JSON, allowNull: true },
        status: { type: DataTypes.STRING, allowNull: true },
        type: { type: DataTypes.STRING, allowNull: true },
        year_built: { type: DataTypes.INTEGER, allowNull: true },
        missions: { type: DataTypes.JSON, allowNull: true },
      },
      {
        sequelize,
        modelName: 'Ship'
      },
    );

    return Ship;
  }

  static associate(models: any) {
    Ship.belongsToMany(models.Mission, {
      through: 'ShipMissions',
      foreignKey: 'shipId',
      otherKey: 'missionId',
    });
  }
}

export { Ship, Ship as ShipAttributes };
