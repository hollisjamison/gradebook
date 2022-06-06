const Models = require('../models/index')
const logger = require('../utils/logger')

const getCohortById = async (req, res) => {
    try {
        const { searchedId } = req.params

        if (!searchedId) {
            return res
                .status(400)
                .send({ message: 'Please provide an id to search by.' })
        }

        const foundCohort = await Models.Cohorts.findAll({
            where: { id: searchedId },
        })

        if (!foundCohort || foundCohort.length === 0) {
            return res
                .status(404)
                .send({ message: 'ID not found in database.' })
        }

        return res.status(200).send(foundCohort)
    } catch (err) {
        logger.error(err)
        return res
            .status(500)
            .send('There was a problem with the database. Try again later.')
    }
}

const getCohortsByAssignment = async (req, res) => {
    try {
        const { searchedId } = req.params

        if (!searchedId) {
            return res
                .status(400)
                .send({ message: 'Please provide an id to search by.' })
        }

        const foundCohorts = await Models.Cohorts.findAll({
            where: { '$assignments.id$': searchedId },
            include: [
                {
                    model: Models.Assignments,
                    as: 'assignments',
                    required: true,
                    attributes: [],
                },
            ],
        })

        if (!foundCohorts) {
            return res
                .status(404)
                .send({ message: 'ID not found in database.' })
        }

        return res.status(200).send(foundCohorts)
    } catch (err) {
        logger.error(err)
        return res
            .status(500)
            .send('There was a problem with the database. Try again later.')
    }
}

const addAssignmentToCohort = async (req, res) => {
    try {
        const { cohortId, assignmentId } = req.body

        if (!cohortId || !assignmentId) {
            return res
                .status(400)
                .send({ message: 'Please provide all required fields.' })
        }

        const newLinkedData = await Models.CohortsAssignments.create({
            cohortId,
            assignmentId,
        })

        if (!newLinkedData) {
            return res.status(404).send({
                message: 'Unable to add new assignment with fields provided',
            })
        }

        return res.status(201).send(newLinkedData)
    } catch (err) {
        logger.error(err)
        return res
            .status(500)
            .send('There was a problem with the database. Try again later.')
    }
}

const addInstructorToCohort = async (req, res) => {
    try {
        const { instructorId, assignmentId } = req.body

        if (!instructorId || !assignmentId) {
            return res
                .status(400)
                .send({ message: 'Please provide all required fields.' })
        }

        const newLinkedData = await Models.CohortsInstructors.create({
            instructorId,
            assignmentId,
        })

        if (!newLinkedData) {
            return res.status(404).send({
                message: 'Unable to add new instructor with fields provided',
            })
        }

        return res.status(201).send(newLinkedData)
    } catch (err) {
        logger.error(err)
        return res
            .status(500)
            .send('There was a problem with the database. Try again later.')
    }
}



const getAllCohorts = async (req, res) => {
    try {
        const allCohorts = await Models.Cohorts.findAll({
            attributes: ['id', 'year', 'season', 'startDate', 'endDate'],
            include: [
                {
                    model: Models.Students,
                    exclude: [
                        'createdAt',
                        'deletedAt',
                        'updatedAt',
                        'deletedAt',
                    ],
                },
                {
                    model: Models.Assignments,
                    through: {
                        model: Models.CohortsAssignments,
                        attributes: [],
                    },
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
        logger.error(err)
        return res
            .status(500)
            .send('There was a problem with the database. Try again later.')
    }
}

const createCohort = async (req, res) => {
    try {
        const { year, season, startDate, endDate } = req.body

        if (!year || !season) {
            return res
                .status(400)
                .send({ message: 'Please provide all required fields.' })
        }

        const newCohort = await Models.Cohorts.create({
            year,
            season,
            startDate,
            endDate,
        })

        if (!newCohort) {
            return res.status(404).send({
                message: 'Unable to create new cohort with fields provided',
            })
        }

        return res.status(201).send(newCohort)
    } catch (err) {
        logger.error(err)
        return res
            .status(500)
            .send('There was a problem with the database. Try again later.')
    }
}

const updateCohort = async (req, res) => {
    try {
        const { id, year, season, startDate, endDate } = req.body

        if (!year || !season || !id) {
            return res.status(400).send({
                message: 'You must provide a complete cohort object.',
            })
        }

        await Models.Cohorts.update(
            {
                id,
                year,
                season,
                startDate,
                endDate,
            },
            { where: { id: id } }
        )

        const updatedCohort = await Models.Cohorts.findOne({
            where: { id: id },
        })

        if (!updatedCohort)
            return res.status(404).send({
                message:
                    'Unable to update cohort with provided ID. Please verify.',
            })

        return res.status(200).send(updatedCohort)
    } catch (err) {
        logger.error(err)
        return res
            .status(500)
            .send('There was a problem with the database. Try again later.')
    }
}

const deleteCohort = async (req, res) => {
    try {
        const { id } = req.params

        if (!id)
            return res
                .status(400)
                .send({ message: 'Please provide an id to delete' })

        await Models.Cohorts.destroy({ where: { id: id } })

        const returnMessage = `ID: ${id} successfully deleted.`
        return res.status(200).send(returnMessage)
    } catch (err) {
        logger.error(err)
        return res
            .status(500)
            .send('There was a problem with the database. Try again later.')
    }
}

module.exports = {
    addAssignmentToCohort,
    getAllCohorts,
    createCohort,
    deleteCohort,
    updateCohort,
    getCohortById,
    getCohortsByAssignment,
    addInstructorToCohort,
}
