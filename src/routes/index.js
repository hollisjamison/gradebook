const glob = require('glob')

let allRouters = {}

// replaces forward slashes (windows) with backslashes Linux/Mac to make this universal
const syncTargetFolder = `${__dirname}/*.js`.replace(/\\/g, '/')

glob.sync(syncTargetFolder).forEach((router) => {
    allRouters = { ...allRouters, ...require(router) }
})

module.exports = allRouters
