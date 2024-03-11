module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('Ships', 'missions', {
            type: Sequelize.JSON,
            allowNull: true,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('Ships', 'missions');
    },
};