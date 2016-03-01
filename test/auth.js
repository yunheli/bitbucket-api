var Auth = require("../index")
var assert = require('assert');
var auth;
var client_id = "S6vLxDGqKUuNG68Sr3", secret = "MjNCNNvjV3BTeMyCm6TxQZLpvSTjaUgZ" ;
beforeEach(function() {
  return auth = new Auth(client_id, secret, null, null)
});

describe('Array', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function (done) {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
      console.log(auth.generateAuthorizeUrl())
      auth.getAccessToken("BfZ8qLwjdUf5AR8FqX",function(err, res, body){
        auth.userProfile(function(err, body){
          console.log("........", err, body)
          done()
        })

      })
    });
  });
});