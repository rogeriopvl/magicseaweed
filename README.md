# magicseaweed

Magicseaweed simple and lightweigth API wrapper. For more details on the api please check the [Documentation](http://magicseaweed.com/developer/forecast-api).

## Install

    npm install magicseaweed

## Usage examples

```javascript
var Msw = require('magicseaweed')('YOUR_API_KEY');

Msw.forecast({ spot_id: 874 }, function (err, data) {
    console.log(data);
});
```

### With all optional params
```javascript
var params = {
    spot_id: 874,
    units: 'eu',
    fields: ['timestamp', 'swell.*']
};

Msw.forecast(params, function (err, data) {
    console.log(data);
});
```

## API

#### Msw.forecast(params, callback)
- `params` : hash containing all the params to send to the API via querystring
  - `params.spot_id` : {number} (required) the id of the spot
  - `params.units` : {string} (optional) the units for the response values (eu, us, uk) (default: us)
  - `params.fields`: {array} (optional) select what fields to include in the response
- `callback` : {function} the callback function, will be passed `err` and `data` as arguments

Anything else you add to the params hash will be added to the querystring of the API request.

## FAQ

**Can I use this module in the browser with browserify?**

In theory yes, but the Magicseaweed API is currently not sending the `Access-Control-Allow-Origin` header in browser requests (somehow the header is sent if you replay the request via cURL).

So if the API changes that behavior, this module will work with browserify.

## License

MIT
