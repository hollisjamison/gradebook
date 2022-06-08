const GradesModel = (connection, Sequelize, Assignments, Students) => {
  return connection.define(
    'grades',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      grade: { type: Sequelize.INTEGER },
      comments: { type: Sequelize.STRING },
      githubURL: { type: Sequelize.STRING },
      assignmentId: {
        type: Sequelize.INTEGER,
        references: { model: Assignments, key: 'id' },
      },
      studentId: {
        type: Sequelize.INTEGER,
        references: { model: Students, key: 'id' },
      },
    },
    { paranoid: true }
  )
}

module.exports = GradesModel
