const express = require('express')
const instructorsRouter = express.Router()
const Controllers = require('../controllers/index')

instructorsRouter.get('/id/:searchedId', Controllers.getInstructorById)
instructorsRouter.get('/', Controllers.getAllInstructors)

instructorsRouter.delete('/delete/:id', Controllers.deleteInstructor)

instructorsRouter.post('/', Controllers.createInstructor)

instructorsRouter.put('/', Controllers.deleteInstructor)

module.exports = { instructorsRouter }
