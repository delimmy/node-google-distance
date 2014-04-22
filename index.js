'use strict';

var qs = require('querystring'),
    got = require('got');

var DISTANCE_API_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json?';

var GoogleDistance = function() {
  this.apiKey = '';
  this.businessClientKey = '';
  this.businessSignatureKey = '';
};

GoogleDistance.prototype.get = function(args, callback) {
  var options = {
    index: args.index || null,
    origins: args.origin,
    destinations: args.destination,
    mode: args.mode || 'driving',
    units: args.units || 'metric',
    language: args.language || 'en',
    avoid: args.avoid || null,
    sensor: args.sensor || false,
    key: this.apiKey
  };

  if (this.businessClientKey && this.businessSignatureKey) {
    delete options.key;
    options.client = this.businessClientKey;
    options.signature = this.businessSignatureKey;
  }
  if (!options.origins) {
    return callback(new Error('Argument Error: Origin is invalid'));
  }
  if (!options.destinations) {
    return callback(new Error('Argument Error: Destination is invalid'));
  }

  this.fetchData(options, function(err, data) {
    if (err) {
      return callback(err);
    }
    var requestStatus = data.status;
    if (requestStatus != 'OK') {
      return callback(new Error('Status error: ' + requestStatus + ': ' + data.error_message));
    }
    var resultStatus = data.rows[0].elements[0].status;
    if (resultStatus != 'OK') {
      return callback(new Error('Result error: ' + resultStatus));
    }

    var element = data.rows[0].elements[0];
    var result = {
      index: options.index,
      distance: element.distance.text,
      distanceValue: element.distance.value,
      duration: element.duration.text,
      durationValue: element.duration.value,
      origin: data.origin_addresses[0],
      destination: data.destination_addresses[0],
      mode: options.mode,
      units: options.units,
      language: options.language,
      avoid: options.avoid,
      sensor: options.sensor
    };
    return callback(null, result);
  });
};

GoogleDistance.prototype.fetchData = function(options, callback) {
  got(DISTANCE_API_URL + qs.stringify(options), function (err, data) {
    if (err) {
      callback(new Error('Request error: Could not fetch data from Google\'s servers: ' + data));
    }

    data = JSON.parse(data);
    callback(null, data);
  });
};

module.exports = new GoogleDistance();
