const express = require('express')
const cohortsRouter = express.Router()
const Controllers = require('../controllers/index')

cohortsRouter.get('/id/:searchedId', Controllers.getCohortById)
cohortsRouter.get('/assignment/:searchedId', Controllers.getCohortsByAssignment)
cohortsRouter.get('/', Controllers.getAllCohorts)

cohortsRouter.delete('/delete/:id', Controllers.deleteCohort)

cohortsRouter.post('/', Controllers.createCohort)
cohortsRouter.post('/assignment', Controllers.addAssignmentToCohort)
cohortsRouter.post('/instructor', Controllers.addInstructorToCohort)

cohortsRouter.put('/', Controllers.updateCohort)

module.exports = { cohortsRouter }
