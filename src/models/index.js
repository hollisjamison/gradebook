const Sequelize = require('sequelize')
const logger = require('../utils/logger')
const StudentsModel = require('./StudentsModel')
const InstructorsModel = require('./InstructorsModel')
const AssignmentsModel = require('./AssignmentsModel')
const CohortsModel = require('./CohortsModel')
const GradesModel = require('./GradesModel')
const CohortsAssignmentsModel = require('./CohortsAssignmentsModel')
const CohortsInstructorsModel = require('./CohortsInstructorsModel')
const config = require('../configs/sequelize')

const environment = process.env.NODE_ENV || 'development'

const { database, username, password, host, dialect } = config[environment]

const connection = new Sequelize(database, username, password, {
    host: host,
    dialect: dialect,
    logging: (message) => logger.info(message),
})

const Instructors = InstructorsModel(connection, Sequelize)
const Assignments = AssignmentsModel(connection, Sequelize)
const Cohorts = CohortsModel(connection, Sequelize)
const Students = StudentsModel(connection, Sequelize, Cohorts)
const Grades = GradesModel(connection, Sequelize, Assignments, Students)
const CohortsAssignments = CohortsAssignmentsModel(
    connection,
    Sequelize,
    Cohorts,
    Assignments
)
const CohortsInstructors = CohortsInstructorsModel(
    connection,
    Sequelize,
    Cohorts,
    Instructors
)

// Cohorts to Students: one to many
Cohorts.hasMany(Students)
Students.belongsTo(Cohorts)

// Assignments to Students: many to many, through grades!
Assignments.belongsToMany(Students, { through: Grades })
Students.belongsToMany(Assignments, { through: Grades })

// Students to Grades: one to many
Students.hasMany(Grades)
Grades.belongsTo(Students)

// // Assignments to Grades: one to many
Assignments.hasMany(Grades)
Grades.belongsTo(Assignments)

// Cohorts to Instructors: many to many
Cohorts.belongsToMany(Instructors, { through: CohortsInstructors })
Instructors.belongsToMany(Cohorts, { through: CohortsInstructors })
// Optional! https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/#the-best-of-both-worlds-the-super-many-to-many-relationship

// Cohorts to Assignments: many to many
Cohorts.belongsToMany(Assignments, { through: CohortsAssignments })
Assignments.belongsToMany(Cohorts, { through: CohortsAssignments })
// Optional: https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/#the-best-of-both-worlds-the-super-many-to-many-relationship
// Assignments.hasMany(CohortsAssignments)
// CohortsAssignments.belongsToMany(Assignments)
// Cohorts.hasMany(CohortsAssignments)
// CohortsAssignments.belongsToMany(Cohorts)

module.exports = {
    Instructors,
    Assignments,
    Cohorts,
    Students,
    Grades,
    CohortsAssignments,
    CohortsInstructors,
}
