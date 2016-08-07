var assert = require('chai').assert,
    distance = require('../');

describe('GoogleDistance', function() {

  describe('#get()', function() {

    it('should return proper location data', function(done) {
      var options = {
        origin: 'San Francisco, CA',
        destination: 'San Diego, CA'
      };
      distance.get(options, function(err, data) {
        if (err) return done(err);
        var expectedData = {
          index: null,
          origin: 'San Francisco, CA, USA',
          destination: 'San Diego, CA, USA',
          mode: 'driving',
          units: 'metric',
          language: 'en',
          avoid: null,
          sensor: false
        };

        assert.isDefined(data.distance, 'Distance data is missing');
        assert.typeOf(data.distance, 'string', 'Distance data should be a string');

        assert.isDefined(data.distanceValue, 'Distance value is missing');
        assert.typeOf(data.distanceValue, 'number', 'Distance value should be a number');

        assert.isDefined(data.duration, 'Duration data is missing');
        assert.typeOf(data.duration, 'string', 'Duration data should be a string');

        assert.isDefined(data.durationValue, 'Duration data is missing');
        assert.typeOf(data.durationValue, 'number', 'Duration value should be a number');

        assert.isDefined(data.durationInTrafficValue, 'Duration in traffic data is missing');
        assert.typeOf(data.durationInTrafficValue, 'number', 'Duration in traffic value should be a number');

        for (var key in expectedData) {
          assert.strictEqual(data[key], expectedData[key], key + ':');
        }
        done();
      });
    });

    it('should return proper location data given multiple origins/destinations', function(done) {
      var options = {
        origins: ['San Francisco, CA','San Diego, CA'],
        destinations: ['San Diego, CA','Seattle, WA']
      };

      distance.get(options, function(err, data) {
        if (err) return done(err);
        var expectedData = [{
          index: null,
          origin: 'San Francisco, CA, USA',
          destination: 'San Diego, CA, USA',
          mode: 'driving',
          units: 'metric',
          language: 'en',
          avoid: null,
          sensor: false
        }, {
          index: null,
          origin: 'San Francisco, CA, USA',
          destination: 'Seattle, WA, USA',
          mode: 'driving',
          units: 'metric',
          language: 'en',
          avoid: null,
          sensor: false
        }, {
          index: null,
          origin: 'San Diego, CA, USA',
          destination: 'San Diego, CA, USA',
          mode: 'driving',
          units: 'metric',
          language: 'en',
          avoid: null,
          sensor: false
        }, {
          index: null,
          origin: 'San Diego, CA, USA',
          destination: 'Seattle, WA, USA',
          mode: 'driving',
          units: 'metric',
          language: 'en',
          avoid: null,
          sensor: false
        }];

        assert.strictEqual(data.length, expectedData.length);

        for (var i = 0; i < expectedData.length; i++) {
          assert.isDefined(data[i].distance, 'Distance data is missing');
          assert.typeOf(data[i].distance, 'string', 'Distance data should be a string');

          assert.isDefined(data[i].distanceValue, 'Distance value is missing');
          assert.typeOf(data[i].distanceValue, 'number', 'Distance value should be a number');

          assert.isDefined(data[i].duration, 'Duration data is missing');
          assert.typeOf(data[i].duration, 'string', 'Duration data should be a string');

          assert.isDefined(data[i].durationValue, 'Duration data is missing');
          assert.typeOf(data[i].durationValue, 'number', 'Duration value should be a number');

          assert.isDefined(data[i].durationInTrafficValue, 'Duration in traffic data is missing');
          assert.typeOf(data[i].durationInTrafficValue, 'number', 'Duration in traffic value should be a number');

          var expected = expectedData[i];
          var actual = data[i];
          for (var key in expected) {
            assert.strictEqual(actual[key], expected[key], key + ':');
          }
        }
        done();
      });
    });


    it('should return proper result when given only one origin/destination in batch mode', function(done) {
      var options = {
        origins: ['San Francisco, CA'],
        destinations: ['San Diego, CA']
      };

      distance.get(options, function(err, data) {
        if (err) return done(err);
        var expectedData = [{
          index: null,
          origin: 'San Francisco, CA, USA',
          destination: 'San Diego, CA, USA',
          mode: 'driving',
          units: 'metric',
          language: 'en',
          avoid: null,
          sensor: false
        }];

        assert.strictEqual(data.length, expectedData.length);

        for (var i = 0; i < expectedData.length; i++) {
          assert.isDefined(data[i].distance, 'Distance data is missing');
          assert.typeOf(data[i].distance, 'string', 'Distance data should be a string');

          assert.isDefined(data[i].distanceValue, 'Distance value is missing');
          assert.typeOf(data[i].distanceValue, 'number', 'Distance value should be a number');

          assert.isDefined(data[i].duration, 'Duration data is missing');
          assert.typeOf(data[i].duration, 'string', 'Duration data should be a string');

          assert.isDefined(data[i].durationValue, 'Duration data is missing');
          assert.typeOf(data[i].durationValue, 'number', 'Duration value should be a number');

          assert.isDefined(data[i].durationInTrafficValue, 'Duration in traffic data is missing');
          assert.typeOf(data[i].durationInTrafficValue, 'number', 'Duration in traffic value should be a number');

          var expected = expectedData[i];
          var actual = data[i];
          for (var key in expected) {
            assert.strictEqual(actual[key], expected[key], key + ':');
          }
        }
        done();
      });
    });

  });
});
