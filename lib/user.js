var Request = require("request");

exports.userProfile = function(callback){
  this.preRequest(_userProfile, arguments)
}

var _userProfile = function(callback){
  var url = "https://api.bitbucket.org/2.0/user";
  var options = {
    url: url,
    headers: that.token.headers
  }
  console.log(that.token.headers)
  Request.get(options, function(err, resp, body){
    callback(err, body)
  })
}

exports.userEmails = function(callback){
  this.preRequest(_userEmails, arguments)
}

var _userEmails = function(callback){
  var url = "https://api.bitbucket.org/2.0/user/emails";
  var options = {
    url: url,
    headers: that.token.headers
  }
  Request.get(options, function(err, resp, body){
    callback(err, body)
  })
}