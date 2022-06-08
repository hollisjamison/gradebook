const Models = require('../models/index')
const logger = require('../utils/logger')

const getAllStudents = async (req, res) => {
  try {
    const getAllStudents = await Models.Students.findAll()

    return res.status(200).send(getAllStudents)
  } catch (err) {
    logger.error(err)
    return res
      .status(500)
      .send('There was a problem with the database. Try again later.')
  }
}

const getStudentById = async (req, res) => {
  try {
    const { searchedId } = req.params

    if (!searchedId) {
      return res
        .status(400)
        .send({ message: 'Please provide an id to search by.' })
    }

    const foundStudent = await Models.Students.findAll({
      where: { id: searchedId },
    })

    if (!foundStudent) {
      return res.status(404).send({ message: 'ID not found in database.' })
    }

    return res.status(200).send(foundStudent)
  } catch (err) {
    logger.error(err)
    return res
      .status(500)
      .send('There was a problem with the database. Try again later.')
  }
}

const createStudent = async (req, res) => {
  try {
    const { firstName, lastName, githubUser, cohortId } = req.body

    if (!firstName || !lastName || !githubUser || cohortId) {
      return res
        .status(400)
        .send({ message: 'Please provide all required fields.' })
    }

    const newStudent = await Models.Students.create({
      firstName,
      lastName,
      githubUser,
      cohortId,
    })

    if (!newStudent) {
      return res.status(404).send({
        message: 'Unable to create new student with fields provided.',
      })
    }

    return res.status(201).send(newStudent)
  } catch (err) {
    logger.error(err)
    return res
      .status(500)
      .send('There was a problem with the database. Try again later.')
  }
}

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params

    if (!id)
      return res.status(400).send({ message: 'Please provide an id to delete' })

    await Models.Students.destroy({ where: { id: id } })

    const returnMessage = `ID: ${id} successfully deleted.`
    return res.status(200).send(returnMessage)
  } catch (err) {
    logger.error(err)
    return res
      .status(500)
      .send('There was a problem with the database. Try again later.')
  }
}

const updateStudent = async (req, res) => {
  try {
    const { id, firstName, lastName, githubUser, cohortId } = req.body

    if (!firstName || !lastName || !githubUser || !id || !cohortId) {
      return res.status(400).send({
        message: 'You must provide a complete student object',
      })
    }

    await Models.Students.update(
      {
        id,
        firstName,
        lastName,
        githubUser,
        cohortId,
      },
      { where: { id: id } }
    )

    const updatedStudent = await Models.Students.findOne({
      where: { id: id },
    })

    if (!updatedStudent)
      return res.status(404).send({
        message: 'Unable to update student with provided ID. Please verify.',
      })

    return res.status(200).send(updatedStudent)
  } catch (err) {
    logger.error(err)
    return res
      .status(500)
      .send('There was a problem with the database. Try again later.')
  }
}

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  updateStudent,
}
