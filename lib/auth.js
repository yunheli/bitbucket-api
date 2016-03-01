var Request = require("request");

function AccessToken(token_obj){
  this.access_token = token_obj.access_token
  this.refresh_token = token_obj.refresh_token
  this.token_type = token_obj.token_type
  this.expires_in = token_obj.expires_in
  this.headers = {
     Authorization: "Bearer " + this.access_token
  }
}

/**
 * 初始化API的构造函数
 * @param {[type]} client_id [description]
 * @param {[type]} secret    [description]
 * @param {[type]} getToken  [description]
 * @param {[type]} saveToken [description]
 */
function API(client_id, secret, getToken, saveToken){
  this.client_id = client_id;
  this.secret = secret;
  this.basic_auth_key = new Buffer(""+client_id+":"+secret).toString('base64')
  this.headers = {
    Authorization: "Basic " + this.basic_auth_key
  }
  this.getToken = getToken || function (callback) {
    callback(null, this.store);
  };
  this.saveToken = saveToken || function (token, callback) {
    this.store = token;
    if (process.env.NODE_ENV === 'production') {
      console.warn('Don\'t save token in memory, when cluster or multi-computer!');
    }
    callback(null);
  };
}
API.prototype.generateAuthorizeUrl = function() {
  url = "https://bitbucket.org/site/oauth2/authorize?client_id="+this.client_id+"&response_type=code";
  return url;
};

/**
 * 调用方法之前先获取token
 * @param  {[type]} method  [description]
 * @param  {[type]} args    [description]
 * @param  {[type]} retryed [description]
 * @return {[type]}         [description]
 */
API.prototype.preRequest = function(method, args, retryed){
  var that = this;
  var callback = args[args.length - 1];
  getToken(function(err, token){
    if(err){
      return callback(err)
    }
    method.apply(that, args)
  })
}
/**
 * 获取token
 * @param  {[type]}   code     [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
API.prototype.getAccessToken = function(code, callback) {
  url = "https://bitbucket.org/site/oauth2/access_token"
  that = this
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
      var token = new AccessToken(body)
      that.saveToken(token, function(err){
        if(err){
          console.log("save token Error")
        }
      })
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