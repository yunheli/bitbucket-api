var Request = require("request");


/**
 * 当前用户的profile
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
exports.ownerProfile = function(callback){
  this.preRequest(_ownerProfile, arguments)
}

var _ownerProfile = function(callback){
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


/**
 * 根据用户名获取用户信息
 * @param  {[type]}   username [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
exports.userProfile = function(username, callback){
  this.preRequest(_userProfile, arguments)
}

var _userProfile = function(username, callback){
  var url = "https://api.bitbucket.org/2.0/users/" + username;
  var options = {
    url: url,
    headers: that.token.headers
  }
  console.log(that.token.headers)
  Request.get(options, function(err, resp, body){
    callback(err, body)
  })

}


/**
 * 获取指定用户名的followers
 * @param  {[type]}   username [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
exports.followers = function(username, callback){
  this.preRequest(_followers, arguments)
}

var _followers = function(username, callback){
  var url = "https://api.bitbucket.org/2.0/users/"+ username +"/followers";
  var options = {
    url: url,
    headers: that.token.headers
  }
  console.log(that.token.headers)
  Request.get(options, function(err, resp, body){
    callback(err, body)
  })

}

/**
 * 获取指定用户的following
 * @param  {[type]}   username [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
exports.following = function(username, callback){
  this.preRequest(_following, arguments)
}

var _following = function(username, callback){
  var url = "https://api.bitbucket.org/2.0/users/"+ username +"/following";
  var options = {
    url: url,
    headers: that.token.headers
  }
  console.log(that.token.headers)
  Request.get(options, function(err, resp, body){
    callback(err, body)
  })

}


/**
 * 获取指定用户的repos
 * @param  {[type]}   username [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
exports.repos = function(username, callback){
  this.preRequest(_repos, arguments)
}

var _repos = function(username, callback){
  var url = "https://api.bitbucket.org/2.0/repositories/" + username;
  var options = {
    url: url,
    headers: that.token.headers
  }
  console.log(that.token.headers)
  Request.get(options, function(err, resp, body){
    callback(err, body)
  })

}


/**
 * [userEmails description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 * {
    "page": 1,
    "pagelen": 10,
    "size": 1,
    "values": [
        {
            "email": "tutorials@bitbucket.org",
            "is_confirmed": true,
            "is_primary": true,
            "links": {
                "self": {
                    "href": "https://api.bitbucket.org/2.0/user/emails/tutorials@bitbucket.org"
                }
            },
            "type": "email"
        }
    ]
}
 */
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