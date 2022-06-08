/* eslint-disable no-unused-vars */
'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('instructors', [
      {
        firstName: 'Hollis',
        lastName: 'Jamison',
        githubUser: 'hollisjamison',
      },
    ])

    await queryInterface.bulkInsert('assignments', [
      {
        name: 'order-book',
        description: 'Create a bitcoin order book.',
        type: 'Project',
        githubURL: 'https://github.com/stackeducation/order-book',
      },
      {
        name: 'tdd-strict-equal',
        description: 'Implement a function that mimics a === operator',
        type: 'Homework',
        githubURL: 'https://github.com/stackeducation/tdd-strict-equal',
      },
      {
        name: 'hazy-calculator',
        description: 'Implement a hazy calculator',
        type: 'Homework',
        githubURL: 'https://github.com/stackeducation/hazy-calculator',
      },
    ])

    await queryInterface.bulkInsert('cohorts', [
      {
        year: 2022,
        season: 'Fall',
      },
    ])

    await queryInterface.bulkInsert('cohortsAssignments', [
      {
        cohortId: 1,
        assignmentId: 1,
      },
      {
        cohortId: 1,
        assignmentId: 2,
      },
    ])

    await queryInterface.bulkInsert('cohortsInstructors', [
      {
        cohortId: 1,
        instructorId: 1,
      },
    ])

    await queryInterface.bulkInsert('students', [
      {
        firstName: 'Shane',
        lastName: 'Tierney',
        githubUser: 'shane-tierney',
        cohortId: 1,
      },
      {
        firstName: 'Paul',
        lastName: 'Torres',
        githubUser: 'pault03',
        cohortId: 1,
      },
    ])

    return queryInterface.bulkInsert('grades', [
      {
        grade: 100,
        comments: 'Great job Shane!',
        githubURL: 'https://github.com/shane-tierney/order-book',
        assignmentId: 1,
        studentId: 1,
      },
      {
        grade: 100,
        comments: 'Wow Shane!',
        githubURL: 'https://github.com/shane-tierney/tdd-strict-equal',
        assignmentId: 2,
        studentId: 1,
      },
      {
        grade: 100,
        comments: 'Wow Paul!!',
        githubURL: 'https://github.com/pault03/order-book',
        assignmentId: 1,
        studentId: 2,
      },
      {
        grade: 100,
        comments: 'Amazing Paul!',
        githubURL: 'https://github.com/pault03/tdd-strict-equal',
        assignmentId: 2,
        studentId: 2,
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('grades')
    await queryInterface.bulkDelete('students')
    await queryInterface.bulkDelete('cohortsInstructors')
    await queryInterface.bulkDelete('cohortsAssignments')
    await queryInterface.bulkDelete('cohorts')
    await queryInterface.bulkDelete('assignments')
    return queryInterface.bulkDelete('instructors')
  },
}
