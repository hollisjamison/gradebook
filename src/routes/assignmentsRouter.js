const express = require('express')
const assignmentsRouter = express.Router()
const Controllers = require('../controllers/index')

assignmentsRouter.get('/id/:searchedId', Controllers.getAssignmentById)
assignmentsRouter.get(
  '/student/:searchedId',
  Controllers.getAssignmentsByStudent
)
assignmentsRouter.get('/cohort/:searchedId', Controllers.getAssignmentsByCohort)
assignmentsRouter.get('/', Controllers.getAllAssignments)

assignmentsRouter.delete('/delete/:id', Controllers.deleteAssignment)

assignmentsRouter.post('/', Controllers.createAssignment)

assignmentsRouter.put('/', Controllers.updateAssignment)

module.exports = { assignmentsRouter }
