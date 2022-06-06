const Models = require('../models/index')
const logger = require('../utils/logger')

const getAllInstructors = async (req, res) => {
    try {
        const getAllInstructors = await Models.Instructors.findAll()

        return res.status(200).send(getAllInstructors)
    } catch (err) {
        logger.error(err)
        return res
            .status(500)
            .send('There was a problem with the database. Try again later.')
    }
}

const getInstructorById = async (req, res) => {
    try {
        const { searchedId } = req.params

        if (!searchedId) {
            return res
                .status(400)
                .send({ message: 'Please provide an id to search by.' })
        }

        const foundInstructor = await Models.Instructors.findAll({
            where: { id: searchedId },
        })

        if (!foundInstructor) {
            return res
                .status(404)
                .send({ message: 'ID not found in database.' })
        }

        return res.status(200).send(foundInstructor)
    } catch (err) {
        logger.error(err)
        return res
            .status(500)
            .send('There was a problem with the database. Try again later.')
    }
}

const createInstructor = async (req, res) => {
    try {
        const { firstName, lastName, githubUser } = req.body

        if (!firstName || !lastName || !githubUser) {
            return res
                .status(400)
                .send({ message: 'Please provide all required fields.' })
        }

        const newInstructor = await Models.Instructors.create({
            firstName,
            lastName,
            githubUser,
        })

        if (!newInstructor) {
            return res.status(404).send({
                message:
                    'Unable to create new instructor with fields provided.',
            })
        }

        return res.status(201).send(newInstructor)
    } catch (err) {
        logger.error(err)
        return res
            .status(500)
            .send('There was a problem with the database. Try again later.')
    }
}

const deleteInstructor = async (req, res) => {
    try {
        const { id } = req.params

        if (!id)
            return res
                .status(400)
                .send({ message: 'Please provide an id to delete' })

        await Models.Instructors.destroy({ where: { id: id } })

        const returnMessage = `ID: ${id} successfully deleted.`
        return res.status(200).send(returnMessage)
    } catch (err) {
        logger.error(err)
        return res
            .status(500)
            .send('There was a problem with the database. Try again later.')
    }
}

const updateInstructor = async (req, res) => {
    try {
        const { id, firstName, lastName, githubUser } = req.body

        if (!firstName || !lastName || !githubUser || !id) {
            return res.status(400).send({
                message: 'You must provide a complete instructor object',
            })
        }

        await Models.Instructors.update(
            {
                id,
                firstName,
                lastName,
                githubUser,
            },
            { where: { id: id } }
        )

        const updatedInstructor = await Models.Instructors.findOne({
            where: { id: id },
        })

        if (!updatedInstructor)
            return res.status(404).send({
                message:
                    'Unable to update instructor with provided ID. Please verify.',
            })

        return res.status(200).send(updatedInstructor)
    } catch (err) {
        logger.error(err)
        return res
            .status(500)
            .send('There was a problem with the database. Try again later.')
    }
}

module.exports = {
    getAllInstructors,
    getInstructorById,
    createInstructor,
    deleteInstructor,
    updateInstructor,
}
