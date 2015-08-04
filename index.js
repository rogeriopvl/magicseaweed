var request = require('request');

var BASE_URL = 'http://magicseaweed.com/api';

module.exports = function (apiKey) {
  return {
    getForecast: function (params, cb) {
      var url = BASE_URL + '/' + apiKey + '/forecast/?spot_id=' + params.spot_id;
      request(url, function (err, res, body) {
        if (typeof cb === 'function') {
          if (err) { return cb(err); }
          return cb(null, JSON.parse(body));
        }
      });
    }
  }
};
