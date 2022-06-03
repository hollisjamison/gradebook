const { Grades } = require('../models/index')

const getAllGrades = async (req, res) => {
    try {
        const allGrades = await Grades.findAll()

        return res.status(200).send(allGrades)
    } catch (err) {
        console.log(err)
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

        const foundGrades = await Grades.findAll({ where: { id: searchedId } })

        if (!foundGrades || foundGrades.length === 0)
            return res
                .status(404)
                .send({ message: 'ID not found in database.' })

        return res.status(200).send(foundGrades)
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .send('There was a problem with the database. Try again later.')
    }
}

const getGradesByStudentId = async (req, res) => {
    try {
        const { searchedId } = req.params

        if (!searchedId)
            return res
                .status(400)
                .send({ message: 'Please provide an id to search by.' })

        const foundGrades = await Grades.findAll({
            where: { studentId: searchedId },
        })

        if (!foundGrades || foundGrades.length === 0)
            return res
                .status(404)
                .send({ message: 'Student ID not found in database.' })

        return res.status(200).send(foundGrades)
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .send('There was a problem with the database. Try again later.')
    }
}

const getGradesByAssignmentId = async (req, res) => {
    try {
        const { searchedId } = req.params

        if (!searchedId)
            return res
                .status(400)
                .send({ message: 'Please provide an id to search by.' })

        const foundGrades = await Grades.findAll({
            where: { assignmentId: searchedId },
        })

        if (!foundGrades || foundGrades.length === 0)
            return res
                .status(404)
                .send({ message: 'Assignment ID not found in database.' })

        return res.status(200).send(foundGrades)
    } catch (err) {
        console.log(err)
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

        const newGrade = await Grades.create({
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
        console.log(err)
        return res
            .status(500)
            .send('There was a problem with the database. Try again later.')
    }
}
module.exports = {
    getAllGrades,
    getGradeById,
    getGradesByAssignmentId,
    getGradesByStudentId,
    createGrade,
}
