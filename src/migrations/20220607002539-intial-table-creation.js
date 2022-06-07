/* eslint-disable no-unused-vars */
'use strict'

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('instructors', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            firstName: { type: Sequelize.STRING, allowNull: false },
            lastName: { type: Sequelize.STRING, allowNull: false },
            githubUser: { type: Sequelize.STRING, allowNull: false },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal(
                    'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
                ),
            },
            deletedAt: { type: Sequelize.DATE },
        })

        await queryInterface.createTable('assignments', {
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
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal(
                    'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
                ),
            },
            deletedAt: { type: Sequelize.DATE },
        })

        await queryInterface.createTable('cohorts', {
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
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal(
                    'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
                ),
            },
            deletedAt: { type: Sequelize.DATE },
        })

        await queryInterface.createTable('students', {
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
                references: { model: 'cohorts', key: 'id' },
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal(
                    'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
                ),
            },
            deletedAt: { type: Sequelize.DATE },
        })

        await queryInterface.createTable('grades', {
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
                references: { model: 'assignments', key: 'id' },
            },
            studentId: {
                type: Sequelize.INTEGER,
                references: { model: 'students', key: 'id' },
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal(
                    'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
                ),
            },
            deletedAt: { type: Sequelize.DATE },
        })

        await queryInterface.createTable('cohortsAssignments', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            cohortId: {
                type: Sequelize.INTEGER,
                references: { model: 'cohorts', key: 'id' },
            },
            assignmentId: {
                type: Sequelize.INTEGER,
                references: { model: 'assignments', key: 'id' },
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal(
                    'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
                ),
            },
            deletedAt: { type: Sequelize.DATE },
        })

        return queryInterface.createTable('cohortsInstructors', {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            cohortId: {
                type: Sequelize.INTEGER,
                references: { model: 'cohorts', key: 'id' },
            },
            instructorId: {
                type: Sequelize.INTEGER,
                references: { model: 'instructors', key: 'id' },
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal(
                    'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
                ),
            },
            deletedAt: { type: Sequelize.DATE },
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('cohortsInstructors')
        await queryInterface.dropTable('cohortsAssignments')
        await queryInterface.dropTable('grades')
        await queryInterface.dropTable('students')
        await queryInterface.dropTable('cohorts')
        await queryInterface.dropTable('assignments')
        return queryInterface.dropTable('instructors')
    },
}
