var request = require('request');

var BASE_URL = 'http://magicseaweed.com/api';

module.exports = function (apiKey) {
  var uri = BASE_URL + '/' + apiKey + '/forecast';

  return {
    getForecast: function (params, cb) {
      var querystring = { spot_id: params.spot_id };
      request(
        { uri: uri, json: true, method: 'GET', qs: querystring },
        function (err, res, body) {
          if (typeof cb === 'function') {
            if (err) { return cb(err); }
            return cb(null, body);
          }
      });
    }
  }
};
