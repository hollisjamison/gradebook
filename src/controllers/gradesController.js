const Models = require('../models/index')
const logger = require('../utils/logger')

const getAllGrades = async (req, res) => {
    try {
        const allGrades = await Models.Grades.findAll()

        return res.status(200).send(allGrades)
    } catch (err) {
        logger.error(err)
        return res
            .status(500)
            .send('There was a problem with the database. Try again later.')
    }
}

const getGradeById = async (req, res) => {
    try {
        const { searchedId } = req.params

        if (!searchedId)
            return res
                .status(400)
                .send({ message: 'Please provide an id to search by.' })

        const foundGrades = await Models.Grades.findAll({
            where: { id: searchedId },
        })

        if (!foundGrades || foundGrades.length === 0)
            return res
                .status(404)
                .send({ message: 'ID not found in database.' })

        return res.status(200).send(foundGrades)
    } catch (err) {
        logger.error(err)
        return res
            .status(500)
            .send('There was a problem with the database. Try again later.')
    }
}

const getGradesByStudent = async (req, res) => {
    try {
        const { searchedId } = req.params

        if (!searchedId)
            return res
                .status(400)
                .send({ message: 'Please provide an id to search by.' })

        const foundGrades = await Models.Grades.findAll({
            where: { studentId: searchedId },
        })

        if (!foundGrades || foundGrades.length === 0)
            return res
                .status(404)
                .send({ message: 'Student ID not found in database.' })

        return res.status(200).send(foundGrades)
    } catch (err) {
        logger.error(err)
        return res
            .status(500)
            .send('There was a problem with the database. Try again later.')
    }
}

const getGradesByAssignment = async (req, res) => {
    try {
        const { searchedId } = req.params

        if (!searchedId)
            return res
                .status(400)
                .send({ message: 'Please provide an id to search by.' })

        const foundGrades = await Models.Grades.findAll({
            where: { assignmentId: searchedId },
        })

        if (!foundGrades || foundGrades.length === 0)
            return res
                .status(404)
                .send({ message: 'Assignment ID not found in database.' })

        return res.status(200).send(foundGrades)
    } catch (err) {
        logger.error(err)
        return res
            .status(500)
            .send('There was a problem with the database. Try again later.')
    }
}

const createGrade = async (req, res) => {
    try {
        const { grade, comments, githubURL, assignmentId, studentId } = req.body

        if (!studentId || !assignmentId || !githubURL || !grade || !comments)
            return res.status(400).send({
                message: 'You must provide a studentId and an assignmentId.',
            })

        const newGrade = await Models.Grades.create({
            grade,
            comments,
            githubURL,
            assignmentId,
            studentId,
        })

        if (!newGrade)
            return res.status(404).send({
                message:
                    'Unable to create grade with provided studentId or assignmentId please verify.',
            })

        return res.status(201).send(newGrade)
    } catch (err) {
        logger.error(err)
        return res
            .status(500)
            .send('There was a problem with the database. Try again later.')
    }
}

const updateGrade = async (req, res) => {
    try {
        const { id, grade, comments, githubURL, assignmentId, studentId } =
            req.body

        if (
            !studentId ||
            !assignmentId ||
            !githubURL ||
            !grade ||
            !comments ||
            !id
        )
            return res.status(400).send({
                message: 'You must provide a complete grade object',
            })

        await Models.Grades.update(
            {
                id,
                grade,
                comments,
                githubURL,
                assignmentId,
                studentId,
            },
            { where: { id: id } }
        )

        const updatedGrade = await Models.Grades.findOne({ where: { id: id } })

        if (!updatedGrade)
            return res.status(404).send({
                message:
                    'Unable to updated grade with provided studentId or assignmentId please verify.',
            })

        return res.status(200).send(updatedGrade)
    } catch (err) {
        logger.error(err)
        return res
            .status(500)
            .send('There was a problem with the database. Try again later.')
    }
}

const deleteGrade = async (req, res) => {
    try {
        const { id } = req.params

        if (!id)
            return res
                .status(400)
                .send({ message: 'Please provide an id to delete' })

        await Models.Grades.destroy({ where: { id: id } })

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
    getAllGrades,
    getGradeById,
    getGradesByAssignment,
    getGradesByStudent,
    createGrade,
    updateGrade,
    deleteGrade,
}
