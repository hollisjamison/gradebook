const CohortsAssignmentsModel = (
    connection,
    Sequelize,
    Cohorts,
    Assignments
) => {
    return connection.define(
        'cohortsAssignments',
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
            assignmentId: {
                type: Sequelize.INTEGER,
                references: { model: Assignments, key: 'id' },
            },
        },
        { paranoid: true }
    )
}

module.exports = CohortsAssignmentsModel
