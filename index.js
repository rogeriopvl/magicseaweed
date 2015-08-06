var request = require('request');

var BASE_URL = 'http://magicseaweed.com/api';

module.exports = function (apiKey) {
  var uri = BASE_URL + '/' + apiKey + '/forecast';

  return {
    forecast: function (params, cb) {
      if (typeof params.fields === 'object') {
        params.fields = params.fields.join(',');
      }

      var opts = { uri: uri, json: true, method: 'GET', qs: params };

      request(opts, function (err, res, body) {
        if (typeof cb === 'function') {
          if (err) {
            return cb(err);
          }
          else if (body.error_response) {
            return cb(new Error(body.error_response.error_msg));
          } else {
            return cb(null, body);
          }
        }
      });
    }
  }
};
