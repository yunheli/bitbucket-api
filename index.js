var API = require("./lib/auth")

API.mixin(require("./lib/user").userProfile)
module.exports = API;