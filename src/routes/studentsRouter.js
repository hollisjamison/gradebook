const express = require('express')
const studentsRouter = express.Router()
const Controllers = require('../controllers/index')

studentsRouter.get('/id/:searchedId', Controllers.getStudentById)
studentsRouter.get('/', Controllers.getAllStudents)

studentsRouter.delete('/delete/:id', Controllers.deleteStudent)

studentsRouter.post('/', Controllers.createStudent)

studentsRouter.put('/', Controllers.updateStudent)

module.exports = { studentsRouter }
