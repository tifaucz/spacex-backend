module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.addColumn('ship', 'abs', { type: DataTypes.INTEGER, allowNull: true });
        await queryInterface.addColumn('ship', 'class', { type: DataTypes.INTEGER, allowNull: true });
        await queryInterface.addColumn('ship', 'home_port', { type: DataTypes.STRING, allowNull: true });
        await queryInterface.addColumn('ship', 'imo', { type: DataTypes.INTEGER, allowNull: true });
        await queryInterface.addColumn('ship', 'mmsi', { type: DataTypes.INTEGER, allowNull: true });
        await queryInterface.addColumn('ship', 'model', { type: DataTypes.STRING, allowNull: true });
        await queryInterface.addColumn('ship', 'roles', { type: DataTypes.JSON, allowNull: true });
        await queryInterface.addColumn('ship', 'status', { type: DataTypes.STRING, allowNull: true });
        await queryInterface.addColumn('ship', 'type', { type: DataTypes.STRING, allowNull: true });
        await queryInterface.addColumn('ship', 'year_built', { type: DataTypes.INTEGER, allowNull: true });
    },

    down: async (queryInterface) => {
        await queryInterface.removeColumn('ship', 'abs');
        await queryInterface.removeColumn('ship', 'class');
        await queryInterface.removeColumn('ship', 'home_port');
        await queryInterface.removeColumn('ship', 'imo');
        await queryInterface.removeColumn('ship', 'mmsi');
        await queryInterface.removeColumn('ship', 'model');
        await queryInterface.removeColumn('ship', 'roles');
        await queryInterface.removeColumn('ship', 'status');
        await queryInterface.removeColumn('ship', 'type');
        await queryInterface.removeColumn('ship', 'year_built');
    },
};
