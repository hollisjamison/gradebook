const StudentsModel = (connection, Sequelize, Cohorts) => {
    return connection.define(
        'students',
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            firstName: { type: Sequelize.STRING, allowNull: false },
            lastName: { type: Sequelize.STRING, allowNull: false },
            githubUser: { type: Sequelize.STRING, allowNull: false },
            cohortId: {
                type: Sequelize.INTEGER,
                references: { model: Cohorts, key: 'id' },
            },
        },
        { paranoid: true }
    )
}

module.exports = StudentsModel
