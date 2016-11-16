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

          expect(function () {
            WebMidi.outputs[0].decrementRegisteredParameter('pitchbendrange', 22);
          }).to.throw(RangeError);

          done();

        });

      });

      it("should throw error if options.time is invalid", function(done) {

        WebMidi.enable(function() {

          expect(function () {
            WebMidi.outputs[0].decrementRegisteredParameter('pitchbendrange', 1, {time: 'abc'});
          }).to.throw(TypeError);

          expect(function () {
            WebMidi.outputs[0].decrementRegisteredParameter('pitchbendrange', 1, {time: '+abc'});
          }).to.throw(TypeError);

          done();

        });

      });

    });

    /**********************************************************************************************/
    // describe('send()', function () {
    //
    //   it("should throw err or if status byte is invalid", function(done) {
    //
    //     WebMidi.enable(function() {
    //
    //       expect(function () {
    //         WebMidi.outputs[0].send(0);
    //       }).to.throw(RangeError);
    //
    //       done();
    //
    //     });
    //
    //   });
    //
    //   it("should throw error if data bytes are invalid", function(done) {
    //
    //     WebMidi.enable(function() {
    //
    //       expect(function () {
    //         WebMidi.outputs[0].send(128, -1);
    //         WebMidi.outputs[0].send(128, 256);
    //       }).to.throw(TypeError);
    //
    //       done();
    //
    //     });
    //
    //   });
    //
    // });

  });


}());
