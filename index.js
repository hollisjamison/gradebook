const express = require('express')
const {
    getAllGrades,
    getGradeById,
    getGradesByStudentId,
    getGradesByAssignmentId,
    createGrade,
} = require('./controllers/gradesController')

const { createAssignment } = require('./controllers/assignmentsController')

const {
    addAssignmentToCohort,
    getAllCohorts,
} = require('./controllers/cohortsController')

const app = express()

// TODO controllers:
app.get('/api/grades', getAllGrades)
app.get('/api/grades/id/:searchedId', getGradeById)
app.get('/api/grades/students/:searchedId', getGradesByStudentId)
app.get('/api/grades/assignments/:searchedId', getGradesByAssignmentId)
app.post('/api/grades', express.json(), createGrade)

app.post('/api/assignments', express.json(), createAssignment)

app.get('/api/cohorts', getAllCohorts)
app.post('/api/cohorts/assignment', express.json(), addAssignmentToCohort)

app.all('*', (req, res) => res.status(404).send('Not found!'))

app.listen(3333, () => {
    console.log('Listening on http://localhost:3333')
})
