const glob = require('glob')

let allRouters = {}

const syncTargetFolder = `${__dirname}/*.js`

glob.sync(syncTargetFolder).forEach((router) => {
  allRouters = { ...allRouters, ...require(router) }
})

module.exports = allRouters
