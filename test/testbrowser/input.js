(function(scope) {

  "use strict";

  var expect = chai.expect;

  describe('Input', function() {

    beforeEach('Make sure WebMidi is not already enabled.', function() {
      WebMidi.disable();
    });

    describe('addListener()', function() {

      it("should throw error if listener is not a function", function(done) {

        WebMidi.enable(function() {

          expect(function () {
            WebMidi.inputs[0].addListener('noteon');
          }).to.throw(TypeError);

          done();
        });

      });

      it("should throw error if type is invalid", function(done) {

        WebMidi.enable(function() {

          expect(function () {
            WebMidi.inputs[0].addListener('prout', 1, function() {});
          }).to.throw(TypeError);

          expect(function () {
            WebMidi.inputs[0].addListener('', 1, function() {});
          }).to.throw(TypeError);

          done();
        });

      });

      it("should throw error if channel is invalid", function(done) {

        WebMidi.enable(function() {

          expect(function () {
            WebMidi.inputs[0].addListener('noteon', "abc", function() {});
          }).to.throw(RangeError);

          expect(function () {
            WebMidi.inputs[0].addListener('noteon', 123, function() {});
          }).to.throw(RangeError);

          done();
        });

      });

      it("should actually add the listener(s)", function(done) {

        WebMidi.enable(function() {

          function a() {}
          function b() {}

          WebMidi.inputs[0].addListener('noteoff', 10, a);
          expect(WebMidi.inputs[0].hasListener('noteoff', 10, a)).to.equal(true);

          WebMidi.inputs[0].addListener('noteon', 10, a);
          expect(WebMidi.inputs[0].hasListener('noteon', 10, b)).to.equal(false);

          WebMidi.inputs[0].addListener('keyaftertouch', "all", a);
          expect(WebMidi.inputs[0].hasListener('keyaftertouch', 3, a)).to.equal(true);

          WebMidi.inputs[0].addListener('controlchange', [1, 2, 3], a);
          expect(WebMidi.inputs[0].hasListener('controlchange', 3, a)).to.equal(true);
          expect(WebMidi.inputs[0].hasListener('controlchange', [1, 3], a)).to.equal(true);
          expect(WebMidi.inputs[0].hasListener('controlchange', [1, 2, 3], a)).to.equal(true);
          expect(WebMidi.inputs[0].hasListener('controlchange', "all", a)).to.equal(false);

          WebMidi.inputs[0].addListener('channelmode', "all", a);
          expect(WebMidi.inputs[0].hasListener('channelmode', 3, a)).to.equal(true);
          expect(WebMidi.inputs[0].hasListener('channelmode', "all", a)).to.equal(true);
          expect(WebMidi.inputs[0].hasListener('channelmode', "all", b)).to.equal(false);
          expect(WebMidi.inputs[0].hasListener('channelmode', 5, a)).to.equal(true);

          done();
        });

      });

    });

    describe('hasListener()', function() {

      it("should throw error if listener is not a function", function(done) {

        WebMidi.enable(function() {

          expect(function () {
            WebMidi.inputs[0].hasListener('noteon');
          }).to.throw(TypeError);

          done();
        });

      });

      it("should correctly check for listeners", function(done) {

        WebMidi.enable(function() {

          function a() {}
          function b() {}

          WebMidi.inputs[0].addListener('noteoff', 10, a);
          expect(WebMidi.inputs[0].hasListener('noteoff', 10, a)).to.equal(true);

          WebMidi.inputs[0].addListener('noteon', 10, a);
          expect(WebMidi.inputs[0].hasListener('noteon', 10, b)).to.equal(false);

          WebMidi.inputs[0].addListener('keyaftertouch', "all", a);
          expect(WebMidi.inputs[0].hasListener('keyaftertouch', 3, a)).to.equal(true);

          WebMidi.inputs[0].addListener('controlchange', [1, 2, 3], a);
          expect(WebMidi.inputs[0].hasListener('controlchange', 3, a)).to.equal(true);
          expect(WebMidi.inputs[0].hasListener('controlchange', [1, 3], a)).to.equal(true);
          expect(WebMidi.inputs[0].hasListener('controlchange', [1, 2, 3], a)).to.equal(true);
          expect(WebMidi.inputs[0].hasListener('controlchange', "all", a)).to.equal(false);

          WebMidi.inputs[0].addListener('channelmode', "all", a);
          expect(WebMidi.inputs[0].hasListener('channelmode', 3, a)).to.equal(true);
          expect(WebMidi.inputs[0].hasListener('channelmode', "all", a)).to.equal(true);
          expect(WebMidi.inputs[0].hasListener('channelmode', "all", b)).to.equal(false);
          expect(WebMidi.inputs[0].hasListener('channelmode', "all", a)).to.equal(true);

          done();
        });

      });

    });


    describe('removeListener()', function() {

      it("should throw error if type is not supported", function(done) {

        WebMidi.enable(function() {

          expect(function () {
            WebMidi.inputs[0].removeListener('xxx');
          }).to.throw(TypeError);

          done();

        });

      });

      it("should throw error if listener is defined but not a function", function(done) {

        WebMidi.enable(function() {

          expect(function () {
            WebMidi.inputs[0].removeListener("start", "all", {});
          }).to.throw(TypeError);

          done();

        });

      });

      it("should throw error if filters param is defined but not an object", function(done) {

        WebMidi.enable(function() {

          expect(function () {
            WebMidi.inputs[0].removeListener("start", function() {}, 123);
          }).to.throw(TypeError);

          done();

        });

      });

      it("should correctly remove listeners", function(done) {

        WebMidi.enable(function() {

          function a() {}
          function b() {}

          WebMidi.inputs[0].addListener('programchange', 10, a);
          WebMidi.inputs[0].removeListener('programchange', 10, a);
          expect(WebMidi.inputs[0].hasListener('programchange', 10, a)).to.equal(false);

          WebMidi.inputs[0].addListener('sysex', undefined, a);
          WebMidi.inputs[0].removeListener('sysex', undefined, a);
          expect(WebMidi.inputs[0].hasListener('sysex', undefined, a)).to.equal(false);

          WebMidi.inputs[0].addListener('channelaftertouch', 10, a);
          WebMidi.inputs[0].removeListener('channelaftertouch', "all", a);
          expect(WebMidi.inputs[0].hasListener('channelaftertouch', 10, a)).to.equal(false);

          WebMidi.inputs[0].addListener('pitchbend', "all", a);
          WebMidi.inputs[0].removeListener('pitchbend', 10, a);
          expect(WebMidi.inputs[0].hasListener('pitchbend', 10, a)).to.equal(false);
          expect(WebMidi.inputs[0].hasListener('pitchbend', 11, a)).to.equal(true);

          WebMidi.inputs[0].addListener('noteoff', 'all', a);
          WebMidi.inputs[0].addListener('noteoff', "all", b);
          WebMidi.inputs[0].removeListener('noteoff');
          expect(WebMidi.inputs[0].hasListener('noteoff', 10, a)).to.equal(false);
          expect(WebMidi.inputs[0].hasListener('noteoff', 11, b)).to.equal(false);

          WebMidi.inputs[0].addListener('keyaftertouch', "all", a);
          WebMidi.inputs[0].addListener('keyaftertouch', "all", b);
          WebMidi.inputs[0].removeListener();
          expect(WebMidi.inputs[0].hasListener('keyaftertouch', 10, a)).to.equal(false);
          expect(WebMidi.inputs[0].hasListener('keyaftertouch', "all", b)).to.equal(false);

          WebMidi.inputs[0].addListener('stop', "all", a);
          WebMidi.inputs[0].addListener('stop', "all", b);
          WebMidi.inputs[0].removeListener('stop');
          expect(WebMidi.inputs[0].hasListener('stop', "all", a)).to.equal(false);
          expect(WebMidi.inputs[0].hasListener('stop', "all", b)).to.equal(false);

          done();
        });

      });

    });

    describe('getCcNameByNumber()', function() {

      it("should throw an error when an invalid CC number is provided", function (done) {

        WebMidi.enable(function() {

            expect(function () {

              [-1, 120, undefined, null, function() {}].forEach(function (param) {
                  WebMidi.inputs[0].getCcNameByNumber(param);
              });


            }).to.throw(RangeError);

            done();

        });

      });

      it("should return undefined when there is no defined name for a valid number", function (done) {

        WebMidi.enable(function() {
          expect(WebMidi.inputs[0].getCcNameByNumber(3)).to.equal(undefined);
          done();
        });

      });

      it("should return correct name", function (done) {

        WebMidi.enable(function() {

          for (var key in WebMidi.MIDI_CONTROL_CHANGE_MESSAGES) {
            if (WebMidi.MIDI_CONTROL_CHANGE_MESSAGES.hasOwnProperty(key)) {
              expect(
                WebMidi.inputs[0].getCcNameByNumber(WebMidi.MIDI_CONTROL_CHANGE_MESSAGES[key])
              ).to.equal(key);
            }
          }

          done();

        });

      });

    });

    describe('getChannelModeByNumber()', function() {

      it("should throw an error when an invalid channel mode number is provided", function (done) {

        WebMidi.enable(function() {

          expect(function () {

            [-1, 0, 119, 128, undefined, null, function() {}].forEach(function (param) {
              WebMidi.inputs[0].getChannelModeByNumber(param);
            });

          }).to.throw(RangeError);

          done();

        });

      });

      it("should return correct channel mode name", function (done) {

        WebMidi.enable(function() {

          for (var key in WebMidi.MIDI_CHANNEL_MODE_MESSAGES) {
            if (WebMidi.MIDI_CHANNEL_MODE_MESSAGES.hasOwnProperty(key)) {
              expect(
                WebMidi.inputs[0].getChannelModeByNumber(WebMidi.MIDI_CHANNEL_MODE_MESSAGES[key])
              ).to.equal(key);
            }
          }

          done();

        });

      });

    });

  });

}());
