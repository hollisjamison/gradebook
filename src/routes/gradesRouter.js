const express = require('express')
const gradesRouter = express.Router()
const Controllers = require('../controllers/index')

gradesRouter.get('/id/:searchedId', Controllers.getGradeById)
gradesRouter.get('/students/:searchedId', Controllers.getGradesByStudent)
gradesRouter.get('/assignments/:searchedId', Controllers.getGradesByAssignment)
gradesRouter.get('/', Controllers.getAllGrades)

gradesRouter.post('/', Controllers.createGrade)

gradesRouter.put('/', Controllers.updateGrade)

gradesRouter.delete('/delete/:id', Controllers.deleteGrade)

module.exports = { gradesRouter }
