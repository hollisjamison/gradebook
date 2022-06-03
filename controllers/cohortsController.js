const {
    Cohorts,
    CohortsAssignments,
    Students,
    Assignments,
} = require('../models/index')

const addAssignmentToCohort = async (req, res) => {
    try {
        const { cohortId, assignmentId } = req.body

        if (!cohortId || !assignmentId)
            return res
                .status(400)
                .send({ message: 'Please provide all required fields.' })

        const newLinkedData = await CohortsAssignments.create({
            cohortId,
            assignmentId,
        })

        if (!newLinkedData)
            return res.status(404).send({
                message: 'Unable to create new assignment with fields provided',
            })

        return res.status(201).send(newLinkedData)
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .send('There was a problem with the database. Try again later.')
    }
}

const getAllCohorts = async (req, res) => {
    try {
        const allCohorts = await Cohorts.findAll({
            attributes: ['id', 'year', 'season', 'startDate', 'endDate'],
            include: [
                {
                    model: Students,
                    attributes: ['id', 'firstName', 'lastName', 'githubUser'],
                },
                {
                    model: Assignments,
                    through: { model: CohortsAssignments, attributes: [] },
                    attributes: {
                        exclude: [
                            'createdAt',
                            'deletedAt',
                            'updatedAt',
                            'deletedAt',
                        ],
                    },
                },
            ],
        })

        return res.status(200).send(allCohorts)
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .send('There was a problem with the database. Try again later.')
    }
}

module.exports = { addAssignmentToCohort, getAllCohorts }
