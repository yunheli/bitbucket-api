var Auth = require("../index")
var assert = require('assert');
var auth;
var client_id = "S6vLxDGqKUuNG68Sr3", secret = "MjNCNNvjV3BTeMyCm6TxQZLpvSTjaUgZ" ;
beforeEach(function() {
  return auth = new Auth(client_id, secret)
});

describe('Array', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function (done) {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
      auth.get_access_token("2ZvpnNYWWWUBLnYJA9",function(err, res, body){
        console.log(auth.generate_authorize_url())
        done()
      })
    });
  });
});