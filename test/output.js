(function(scope) {

  "use strict";

  var expect = chai.expect;

  describe('Output', function() {

    beforeEach('Make sure WebMidi is not already enabled.', function() {
      WebMidi.disable();
    });

    describe('decrementRegisteredParameter()', function () {

      it("should throw error if registered parameter is invalid", function(done) {

        WebMidi.enable(function() {

          expect(function () {
            WebMidi.outputs[0].decrementRegisteredParameter(0);
          }).to.throw(TypeError);

          expect(function () {
            WebMidi.outputs[0].decrementRegisteredParameter('xxx');
          }).to.throw(TypeError);

          done();

        });

      });

      it("should throw error if channel is invalid", function(done) {

        WebMidi.enable(function() {

          if (WebMidi.outputs.length > 0) {

            expect(function () {
              WebMidi.outputs[0].decrementRegisteredParameter('pitchbendrange', 22);
            }).to.throw(RangeError);

          } else {
            this.skip();
          }

          done();

        }.bind(this));

      });

      // it("should throw error if options.time is invalid", function(done) {
      //
      //   WebMidi.enable(function() {
      //
      //     expect(function () {
      //       WebMidi.outputs[0].decrementRegisteredParameter('pitchbendrange', 1, {time: 'abc'});
      //     }).to.throw(TypeError);
      //
      //     expect(function () {
      //       WebMidi.outputs[0].decrementRegisteredParameter('pitchbendrange', 1, {time: '+abc'});
      //     }).to.throw(TypeError);
      //
      //     done();
      //
      //   });
      //
      // });

    });

    describe('incrementRegisteredParameter()', function () {

      it("should throw error if registered parameter is invalid", function(done) {

        WebMidi.enable(function() {

          expect(function () {
            WebMidi.outputs[0].incrementRegisteredParameter(0);
          }).to.throw(Error);

          expect(function () {
            WebMidi.outputs[0].incrementRegisteredParameter('xxx');
          }).to.throw(Error);

          done();

        });

      });

      it("should throw error if channel is invalid", function(done) {

        WebMidi.enable(function() {

          if (WebMidi.outputs.length > 0) {

            expect(function () {
              WebMidi.outputs[0].incrementRegisteredParameter('pitchbendrange', 0);
            }).to.throw(RangeError);

          } else {
            this.skip();
          }

          done();

        }.bind(this));

      });

      // it("should throw error if options.time is invalid", function(done) {
      //
      //   WebMidi.enable(function() {
      //
      //     expect(function () {
      //       WebMidi.outputs[0].decrementRegisteredParameter('pitchbendrange', 1, {time: 'abc'});
      //     }).to.throw(TypeError);
      //
      //     expect(function () {
      //       WebMidi.outputs[0].decrementRegisteredParameter('pitchbendrange', 1, {time: '+abc'});
      //     }).to.throw(TypeError);
      //
      //     done();
      //
      //   });
      //
      // });

    });

    describe('playNote()', function () {

      it("should throw error if note is invalid", function(done) {

        WebMidi.enable(function() {

          if (WebMidi.outputs.length > 0) {

            ["Z-8", "R22", -1, 128, undefined, null, function() {}, ["x"]].forEach(function (param) {
              expect(function () {
                WebMidi.outputs[0].playNote(param);
              }).to.throw(Error);
            });

          } else {
            this.skip();
          }

          done();

        }.bind(this));

      });

      it("should throw error if channel is invalid", function(done) {

        WebMidi.enable(function() {

          if (WebMidi.outputs.length > 0) {

            [0, -1, 17, [], undefined, null, function() {}, "x", ["x"]].forEach(function (param) {
              expect(function () {
                WebMidi.inputs[0].playNote(64, param);
              }).to.throw(Error);
            });

          } else {
            this.skip();
          }

          done();

        }.bind(this));

      });

      // it("should throw error if options.time is invalid", function(done) {
      //
      //   WebMidi.enable(function() {
      //
      //     expect(function () {
      //       WebMidi.outputs[0].decrementRegisteredParameter('pitchbendrange', 1, {time: 'abc'});
      //     }).to.throw(TypeError);
      //
      //     expect(function () {
      //       WebMidi.outputs[0].decrementRegisteredParameter('pitchbendrange', 1, {time: '+abc'});
      //     }).to.throw(TypeError);
      //
      //     done();
      //
      //   });
      //
      // });

    });

    describe('send()', function () {

      it("should throw error if status byte is invalid", function(done) {

        WebMidi.enable(function() {

          if (WebMidi.outputs.length > 0) {

            ["xxx", [], 127, 256, undefined, null, -1].forEach(function (param) {
              expect(function () {
                WebMidi.outputs[0].send(param);
              }).to.throw(RangeError);
            });

          } else {
            this.skip();
          }

          done();

        }.bind(this));

      });

      it("should throw error if data bytes are invalid", function(done) {

        WebMidi.enable(function() {

          if (WebMidi.outputs.length > 0) {

            ["xxx", [], -1, 256, undefined, null, -1].forEach(function (param) {
              expect(function () {
                WebMidi.outputs[0].send(128, param);
              }).to.throw(TypeError);
            });

          } else {
            this.skip();
          }

          done();

        });

      });

    });

  });

}());
