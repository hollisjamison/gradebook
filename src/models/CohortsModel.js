const CohortsModel = (connection, Sequelize) => {
  return connection.define(
    'cohorts',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      season: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      startDate: {
        type: Sequelize.DATEONLY,
      },
      endDate: {
        type: Sequelize.DATEONLY,
      },
    },
    { paranoid: true }
  )
}

module.exports = CohortsModel
