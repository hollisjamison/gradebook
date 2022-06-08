const express = require('express')
const logger = require('./utils/logger')

const morganMiddleware = require('./middlewares/morgan.middleware')
const Routers = require('./routes/index')

const app = express()

// middlewares
app.use(morganMiddleware)
app.use(express.json())

app.use('/api/grades', Routers.gradesRouter)
app.use('/api/assignments', Routers.assignmentsRouter)
app.use('/api/cohorts', Routers.cohortsRouter)
app.use('/api/instructors', Routers.instructorsRouter)
app.use('/api/students', Routers.studentsRouter)

app.all('*', (req, res) => res.status(404).send('Not found!'))

app.listen(3333, () => {
  logger.info('Listening on http://localhost:3333')
})
