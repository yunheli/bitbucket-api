var Request = require("request");

function AccessToken(token_obj){
  this.access_token = token_obj.access_token
  this.refresh_token = token_obj.refresh_token
  this.token_type = token_obj.token_type
  this.expires_in = token_obj.expires_in
}

function API(client_id, secret){
  this.client_id = client_id;
  this.secret = secret;
  this.basic_auth_key = new Buffer(""+client_id+":"+secret).toString('base64')
  this.headers = {
    Authorization: "Basic " + this.basic_auth_key
  }
}
API.prototype.generate_authorize_url = function() {
  url = "https://bitbucket.org/site/oauth2/authorize?client_id="+this.client_id+"&response_type=code";
  return url;
};

API.prototype.get_access_token = function(code, callback) {
  url = "https://bitbucket.org/site/oauth2/access_token"
  Request.post({
    url: url,
    headers: this.headers,
    form: {
      code: code,
      grant_type: "authorization_code"
    }
  }, function(err,res,body){
    console.log("1")
    console.log(body)
    if( !err ){
      this.token = new AccessToken(body)
    }
    callback(err, res, body)
  })
};

API.prototype.info = function() {
  return "info......";
};

/**
 * 用于支持对象合并。将对象合并到API.prototype上，使得能够支持扩展
 * Examples:
 * ```
 * // 媒体管理（上传、下载）
 * API.mixin(require('./lib/api_media'));
 * ```
 * @param {Object} obj 要合并的对象
 */

API.mixin = function(obj){
  for (var key in obj) {
    if (API.prototype.hasOwnProperty(key)) {
      throw new Error('Don\'t allow override existed prototype method. method: '+ key);
    }
    API.prototype[key] = obj[key];
  }
}

module.exports = API;