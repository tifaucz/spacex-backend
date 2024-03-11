import { Sequelize, Model, DataTypes, CreationOptional } from 'sequelize';

class Mission extends Model {
    declare id: CreationOptional<string>;
    declare flight: string;
    declare name: string;

    static initModel(sequelize: Sequelize) {
        Mission.init(
            {
                id: {
                    type: DataTypes.UUID,
                    primaryKey: true,
                    defaultValue: DataTypes.UUIDV4,
                },
                flight: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                sequelize,
                tableName: 'Missions',
            },
        );

        return Mission;
    }
}

export { Mission };
