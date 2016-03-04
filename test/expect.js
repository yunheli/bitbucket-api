var expect = require('expect.js');

describe('expect', function() {
  describe('#be()', function () {
    it('should expect equal', function (done) {
      expect({ a: 'b' }).to.eql({ a: 'b' });
      done()
    });
  });
});