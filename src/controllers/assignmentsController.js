const Models = require('../models/index')
const logger = require('../utils/logger')

const getAllAssignments = async (req, res) => {
    try {
        const allGrades = await Models.Assignments.findAll()

        return res.status(200).send(allGrades)
    } catch (err) {
        logger.error(err)
        return res
            .status(500)
            .send('There was a problem with the database. Try again later.')
    }
}

const getAssignmentById = async (req, res) => {
    try {
        const { searchedId } = req.params

        if (!searchedId) {
            return res
                .status(400)
                .send({ message: 'Please provide an id to search by.' })
        }

        const foundAssignment = await Models.Assignments.findAll({
            where: { id: searchedId },
        })

        if (!foundAssignment || foundAssignment.length === 0) {
            return res
                .status(404)
                .send({ message: 'ID not found in database.' })
        }

        return res.status(200).send(foundAssignment)
    } catch (err) {
        logger.error(err)
        return res
            .status(500)
            .send('There was a problem with the database. Try again later.')
    }
}

const getAssignmentsByStudent = async (req, res) => {
    try {
        const { searchedId } = req.params

        if (!searchedId) {
            return res
                .status(400)
                .send({ message: 'Please provide an id to search by.' })
        }

        const foundAssignments = await Models.Assignments.findAll({
            where: { '$students.id$': searchedId },
            include: [
                {
                    model: Models.Students,
                    as: 'students',
                    required: true,
                    attributes: [],
                },
            ],
        })

        if (!foundAssignments) {
            return res
                .status(404)
                .send({ message: 'ID not found in database.' })
        }

        return res.status(200).send(foundAssignments)
    } catch (err) {
        logger.error(err)
        return res
            .status(500)
            .send('There was a problem with the database. Try again later.')
    }
}

const getAssignmentsByCohort = async (req, res) => {
    try {
        const { searchedId } = req.params

        if (!searchedId) {
            return res
                .status(400)
                .send({ message: 'Please provide an id to search by.' })
        }

        const foundAssignments = await Models.Assignments.findAll({
            where: { '$cohorts.id$': searchedId },
            include: [
                {
                    model: Models.Cohorts,
                    as: 'cohorts',
                    required: true,
                    attributes: [],
                },
            ],
        })

        if (!foundAssignments) {
            return res
                .status(404)
                .send({ message: 'ID not found in database.' })
        }

        return res.status(200).send(foundAssignments)
    } catch (err) {
        logger.error(err)
        return res
            .status(500)
            .send('There was a problem with the database. Try again later.')
    }
}

const createAssignment = async (req, res) => {
    try {
        const { name, description, type, githubURL, assignedDate, dueDate } =
            req.body

        if (!name || !description || !type || !githubURL) {
            return res
                .status(400)
                .send({ message: 'Please provide all required fields.' })
        }

        const newAssignment = await Models.Assignments.create({
            name,
            description,
            type,
            githubURL,
            assignedDate,
            dueDate,
        })

        if (!newAssignment) {
            return res.status(404).send({
                message: 'Unable to create new assignment with fields provided',
            })
        }

        return res.status(201).send(newAssignment)
    } catch (err) {
        logger.error(err)
        return res
            .status(500)
            .send('There was a problem with the database. Try again later.')
    }
}

const updateAssignment = async (req, res) => {
    try {
        const {
            id,
            name,
            description,
            type,
            githubURL,
            assignedDate,
            dueDate,
        } = req.body

        if (!name || !description || !type || !githubURL || !id) {
            return res.status(400).send({
                message: 'You must provide a complete grade object',
            })
        }

        const acceptableTypes = "'Homework', 'Classwork', 'Project'"

        if (!acceptableTypes.includes(type)) {
            return res.status(400).send({
                message: `Valid Types are: ${acceptableTypes}`,
            })
        }

        await Models.Assignments.update(
            {
                id,
                name,
                description,
                type,
                githubURL,
                assignedDate,
                dueDate,
            },
            { where: { id: id } }
        )

        const updatedAssignment = await Models.Assignments.findOne({
            where: { id: id },
        })

        if (!updatedAssignment)
            return res.status(404).send({
                message:
                    'Unable to update assignment with provided ID. Please verify.',
            })

        return res.status(200).send(updatedAssignment)
    } catch (err) {
        logger.error(err)
        return res
            .status(500)
            .send('There was a problem with the database. Try again later.')
    }
}

const deleteAssignment = async (req, res) => {
    try {
        const { id } = req.params

        if (!id)
            return res
                .status(400)
                .send({ message: 'Please provide an id to delete' })

        await Models.Assignments.destroy({ where: { id: id } })

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
    createAssignment,
    getAllAssignments,
    getAssignmentById,
    getAssignmentsByStudent,
    getAssignmentsByCohort,
    updateAssignment,
    deleteAssignment,
}
