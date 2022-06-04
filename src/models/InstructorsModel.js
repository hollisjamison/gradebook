const InstructorsModel = (connection, Sequelize) => {
    return connection.define(
        'instructors',
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            firstName: { type: Sequelize.STRING, allowNull: false },
            lastName: { type: Sequelize.STRING, allowNull: false },
            githubUser: { type: Sequelize.STRING, allowNull: false },
        },
        { paranoid: true }
    )
}

module.exports = InstructorsModel
