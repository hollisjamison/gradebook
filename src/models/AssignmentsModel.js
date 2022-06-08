const AssignmentsModel = (connection, Sequelize) => {
  return connection.define(
    'assignments',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.STRING, allowNull: false },
      type: {
        type: Sequelize.ENUM('Classwork', 'Homework', 'Project'),
        allowNull: false,
      },
      githubURL: { type: Sequelize.STRING, allowNull: false },
      assignedDate: {
        type: Sequelize.DATEONLY,
      },
      dueDate: {
        type: Sequelize.DATEONLY,
      },
    },
    { paranoid: true }
  )
}

module.exports = AssignmentsModel
