const glob = require('glob')

let allControllers = {}

const syncTargetFolder = `${__dirname}/*.js`

glob.sync(syncTargetFolder).forEach((controller) => {
    allControllers = { ...allControllers, ...require(controller) }
})

module.exports = allControllers
