var test = require('tape');
var nock = require('nock');
var MSW = require('../');

var TEST_API_KEY = 'someApiKey';
var TEST_URL = 'http://magicseaweed.com/api/someApiKey';

var mockErrorResponse = {
    error_response: {
      code: 501,
      error_msg: 'Invalid parameters were supplied and did not pass our (...)'
    }
};

var mockSuccessResponse = [
  {
    timestamp: 123456789,
    localTimestamp: 123456788,
    fadedRating: 0,
    solidRating: 0,
    swell: {},
    wind: {},
    conditions: {},
    charts: {}
  }
];

nock(TEST_URL)
  .get('/forecast')
  .query({ spot_id: 10 })
  .reply(200, mockSuccessResponse);

nock(TEST_URL)
  .get('/forecast')
  .query({ spot_id: -1 })
  .reply(200, mockErrorResponse);

test('exports function and calling it returns object with method', function (t) {
  t.plan(3);
  var msw = MSW(TEST_API_KEY);
  t.equals(typeof MSW, 'function');
  t.equals(typeof msw, 'object');
  t.equals(typeof msw.getForecast, 'function');

});

test('getForecast called correctly', function (t) {
  t.plan(2);
  var msw = MSW(TEST_API_KEY);
  msw.getForecast({ spot_id: 10 }, function (err, data) {
    t.error(err);
    t.equals(typeof data, 'object');
  });
});

test('getForecast called with wrong or missing spot_id', function (t) {
  t.plan(3);
  var msw = MSW(TEST_API_KEY);
  msw.getForecast({ spot_id: -1 }, function (err, data) {
    t.error(err);
    t.equals(typeof data, 'object');
    t.equals(data.error_response.code, 501);
  });
});
