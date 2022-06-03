const { Assignments } = require('../models/index')

const createAssignment = async (req, res) => {
    try {
        const { name, description, type, githubURL, assignedDate, dueDate } =
            req.body

        if (
            !name ||
            !description ||
            !type ||
            !githubURL ||
            !assignedDate ||
            !dueDate
        )
            return res
                .status(400)
                .send({ message: 'Please provide all required fields.' })

        const newAssignment = await Assignments.create({
            name,
            description,
            type,
            githubURL,
            assignedDate,
            dueDate,
        })

        if (!newAssignment)
            return res.status(404).send({
                message: 'Unable to create new assignment with fields provided',
            })

        return res.status(201).send(newAssignment)
    } catch (err) {
        console.log(err)
        return res
            .status(500)
            .send('There was a problem with the database. Try again later.')
    }
}

module.exports = { createAssignment }
