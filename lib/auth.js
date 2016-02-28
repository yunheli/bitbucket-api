var Request = require("request");
function Auth(client_id, secret){
  this.client_id = client_id;
  this.secret = secret;
  this.basic_auth_key = new Buffer(""+client_id+":"+secret).toString('base64')
  this.headers = {
    Authorization: this.basic_auth_key
  }
}
Auth.prototype.generate_authorize_url = function() {
  url = "https://bitbucket.org/site/oauth2/authorize?client_id="+this.client_id+"&response_type=code";
  return url;
};

Auth.prototype.get_access_token = function(code, callback) {
  url = "https://bitbucket.org/site/oauth2/access_token"
  Request.post({
    url: url,
    headers: this.headers,
    form: {
      code: code
    }
  }, function(err,res,body){
    console.log("1")
    console.log(err, res, body)
    callback(err, res, body)
  })
};

Auth.prototype.info = function() {
  return "info......";
};

module.exports = Auth;