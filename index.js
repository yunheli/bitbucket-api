var API = require("./lib/auth")

API.mixin(require("./lib/user"))
module.exports = API;