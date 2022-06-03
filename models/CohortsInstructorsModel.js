const CohortsInstructorsModel = (
    connection,
    Sequelize,
    Cohorts,
    Instructors
) => {
    return connection.define(
        'cohortsInstructors',
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            cohortId: {
                type: Sequelize.INTEGER,
                references: { model: Cohorts, key: 'id' },
            },
            instructorId: {
                type: Sequelize.INTEGER,
                references: { model: Instructors, key: 'id' },
            },
        },
        { paranoid: true }
    )
}

module.exports = CohortsInstructorsModel
