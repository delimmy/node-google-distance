# Google Distance Matrix API for Node.js
[![Build Status](https://travis-ci.org/edwlook/node-google-distance.svg?branch=master)](https://travis-ci.org/edwlook/node-google-distance)

Easily get traveling distance and duration data between locations with the [Google Distance Matrix API](https://developers.google.com/maps/documentation/distancematrix/)

## Installation

    npm install google-distance

## Usage
```js
var distance = require('google-distance');

distance.get(
  {
    origin: 'San Francisco, CA',
    destination: 'San Diego, CA'
  },
  function(err, data) {
    if (err) return console.log(err);
    console.log(data);
});
```
The above example outputs the following `data` object. durationInTraffic and durationInTrafficValue is only available for valid Maps API key:
```js
{
  index: null,
  distance: '807 km',
  distanceValue: 807366,
  duration: '7 hours 30 mins',
  durationValue: 26981,
  durationInTraffic: '8 hours 4 mins',
  durationInTrafficValue: 36781,
  origin: 'San Francisco, CA, USA',
  destination: 'San Diego, CA, USA',
  mode: 'driving',
  units: 'metric',
  language: 'en',
  avoid: null,
  sensor: false
}
```
#### Batch Mode

This example will return an array of `data` objects corresponding to all origin/destination pairs.
```js
distance.get(
{
  origins: ['San Francisco, CA','San Diego, CA'],
  destinations: ['San Diego, CA','Seattle, WA']
},
function(err, data) {
  if (err) return console.log(err);
  console.log(data);
});
```
Result:

Origin       | Destination
------------ | -------------
San Francisco, CA | San Diego, CA
San Francisco, CA | Seattle, WA
San Diego, CA | San Diego, CA
San Diego, CA | Seattle, WA


## Additional Parameters

Here is a full list of options you can include to tailor your query:

* origin, destination - `name` (eg. `'San Francisco, CA'`) | `latitude/longitude` (eg. `'51.510652,-0.095444'`)
* index - `null` (default) | specify an index for identification
* mode - `'driving'` (default) | `'walking'` | `'bicycling'`
* units - `'metric'` (default) kilometers/meters | `'imperial'` miles/feet
* language - `'en'` (default) | [more languages](https://spreadsheets.google.com/pub?key=p9pdwsai2hDMsLkXsoM05KQ&gid=1)
* avoid - `null` (default) | `'highways'` | `'tolls'`
* sensor - `false` (default) | `true` | determines if GPS is used to find user location

To obtain travel time with traffic:
* departure_time - specifies the desired time of departure in seconds, defaults to current time in seconds.
* traffic_model - `'best_guess'` (default) | `'pessimistic'` | `'pessimistic`'

Note: The `units` setting only affects the text displayed within `distance` fields.

`distanceValue` is always in meters, and `durationValue` is always in seconds.

## More Examples

This example specifies `mode` and `units`:

```js
distance.get(
  {
    origin: 'San Francisco, CA',
    destination: 'Los Angeles, CA',
    mode: 'bicycling',
    units: 'imperial'
  },
  function(err, data) {
    if (err) return console.log(err);
    console.log(data);
});
```

Outputs:

```js
{
  index: null,
  distance: '499 mi',
  distanceValue: 802534,
  duration: '1 day 21 hours',
  durationValue: 161896,
  origin: 'San Francisco, CA, USA',
  destination: 'Los Angeles, CA, USA',
  mode: 'bicycling',
  units: 'imperial',
  language: 'en',
  avoid: null,
  sensor: false
}
```

***

Let's use latitude and longitude for our origin/destination and an index:

```js
distance.get(
{
  index: 1,
  origin: '37.772886,-122.423771',
  destination: '37.871601,-122.269104'
},
function(err, data) {
  if (err) return console.log(err);
  console.log(data);
});
```

Outputs:

```js
{
  index: 1,
  distance: '21.9 km',
  distanceValue: 21946,
  duration: '21 mins',
  durationValue: 1251,
  origin: 'Octavia Boulevard, San Francisco, CA 94102, USA',
  destination: '2066-2070 University Avenue, Berkeley, CA 94704, USA',
  mode: 'driving',
  units: 'metric',
  language: 'en',
  avoid: null,
  sensor: false
}
```

## API Keys

Using an API key is not required, but recommended since you can track your usage and make sure you don't exceed [Google's quota](https://developers.google.com/maps/documentation/distancematrix/#Limits). You can request a key by [following these steps](https://developers.google.com/maps/documentation/distancematrix/#api_key).

Specify an API key for use like this:

```js
var distance = require('google-distance');
distance.apiKey = 'API_KEY';
```

Business users can omit the API key and instead specify their business client and signature keys:

```js
var distance = require('google-distance');
distance.businessClientKey = 'CLIENT_KEY';
distance.businessSignatureKey = 'SIGNATURE_KEY';
```

## Running Tests

1) Install the development dependencies:

    npm install

2) Run the tests:

    npm test
