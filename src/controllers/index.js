const glob = require('glob')

let allControllers = {}

// replaces forward slashes (windows) with backslashes Linux/Mac to make this universal
const syncTargetFolder = `${__dirname}/*.js`.replace(/\\/g, '/')

glob.sync(syncTargetFolder).forEach((controller) => {
    allControllers = { ...allControllers, ...require(controller) }
})

module.exports = allControllers
