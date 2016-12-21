(function(scope) {

  "use strict";

  var expect = chai.expect;

  describe('WebMidi', function() {

    it("should be accessible in the global window scope (if running in a browser)", function () {
      if (typeof window === "object") {
        expect(WebMidi).to.be.instanceOf(WebMidi.constructor);
      }
    });

    it("should adapt to Electron, NW.js environment or pure Node.js environments");

    it("should not allow direct user instantiation", function () {
      expect(function () {
        new WebMidi.constructor();
      }).to.throw(Error);
    });

    describe('enable()', function() {

      beforeEach('Make sure WebMidi is not already enabled.', function () {
        WebMidi.disable();
      });

      it("should pass error to callback if Web MIDI API not supported", sinon.test(function (done) {

        if (navigator && navigator.requestMIDIAccess) {
          var rma = this.stub(navigator, "requestMIDIAccess");
          rma.returns(Promise.reject(new Error('Simulated failure!')));
        }

        WebMidi.enable(function (err) {
          expect(err).to.be.instanceof(Error);
          done();
        });

      }));

      it("should set 'enabled' property to false if it fails", sinon.test(function (done) {

        if (navigator && navigator.requestMIDIAccess) {
          var stub = this.stub(navigator, "requestMIDIAccess");
          stub.returns(Promise.reject(new Error('Simulated failure!')));
        }

        WebMidi.enable(function (err) {
          expect(WebMidi.enabled).to.equal(false);
          done();
        });

      }));

      it("should set the enabled property to true if successful", function (done) {

        WebMidi.enable(function (err) {

          if (err) { // This could happen if WebMIDIAPIShim is there but not the Jazz-Plugin
            expect(WebMidi.enabled).to.equal(false);
          } else {
            expect(WebMidi.enabled).to.equal(true);
          }

          done();

        });

      });

      it("should execute the callback", function (done) {
        WebMidi.enable(function () {
          done();
        });
      });

      it("should enable sysex only if requested (for browsers with native MIDI)", function (done) {

        WebMidi.enable(function () {

          if ( Utils.isNative(navigator.requestMIDIAccess) ) {
            expect(WebMidi.sysexEnabled).to.equal(true);
          } else {
            expect(WebMidi.sysexEnabled).to.be.oneOf([true, false]);
          }

          done();
        }, true);

      });

      it("should not enable sysex unless requested (for browsers with native MIDI)", function (done) {

        WebMidi.enable(function () {

          if ( Utils.isNative(navigator.requestMIDIAccess) ) {
            expect(WebMidi.sysexEnabled).to.equal(false);
          } else {
            expect(WebMidi.sysexEnabled).to.be.oneOf([true, false]);
          }

          done();
        }, false);

      });

      it("should create as many inputs and outputs as are available on the host");

    });

    describe('disable()', function() {

      beforeEach('Make sure WebMidi is not already enabled.', function() {
        WebMidi.disable();
      });

      it("should set the enabled property to false", function(done) {

        WebMidi.enable(function() {
          WebMidi.disable();
          expect(WebMidi.enabled).to.equal(false);
          done();
        });

      });

      it("should set the sysexEnabled property to false", function(done) {

        WebMidi.enable(function() {
          WebMidi.disable();
          expect(WebMidi.sysexEnabled).to.equal(false);
          done();
        });

      });

      it("should trim input and output array lengths to 0", function(done) {

        WebMidi.enable(function() {
          WebMidi.disable();
          expect(WebMidi.inputs.length).to.equal(0);
          expect(WebMidi.outputs.length).to.equal(0);
          done();
        });

      });

      it("should remove all user handlers", function(done) {

        WebMidi.enable(function() {
          WebMidi.disable();
          for (var i = 0; i < WebMidi._midiInterfaceEvents.length; i++) {
            expect(WebMidi._userHandlers[WebMidi._midiInterfaceEvents[i]].length).to.equal(0);
          }
          done();
        });

      });

      it("should throw error if Web MIDI API is not supported");
      // it("should throw error if Web MIDI API is not supported", sinon.test(function() {
      //
      //   if (navigator && navigator.requestMIDIAccess) {
      //     // var rma = this.stub(navigator, "requestMIDIAccess");
      //     // rma.returns(Promise.reject(new Error('Simulated failure!')));
      //   }
      //
      //   expect(function () {
      //     WebMidi.disable();
      //   }).to.throw(Error);
      //
      // }));

    });

    /************************************************************************************************/
    describe('getInputById()', function() {

      beforeEach('Make sure WebMidi is not already enabled.', function() {
        WebMidi.disable();
      });

      it("should throw error if WebMidi is disabled", function() {
        expect(function () {
          WebMidi.getInputById();
        }).to.throw(Error);
      });

      it("should return false if no device is found", function(done) {

        WebMidi.enable(function() {
          expect(WebMidi.getInputById('0000000')).to.equal(false);
          done();
        });

      });

      it("should return the right input", function(done) {

        WebMidi.enable(function() {

          if (WebMidi.inputs.length > 0) {
            var id = WebMidi.inputs[0].id;
            expect(WebMidi.getInputById(id)).to.equal(WebMidi.inputs[0]);
          }

          done();

        });

      });

      it("should return instance of Input", function(done) {

        WebMidi.enable(function() {

          // if (WebMidi.inputs.length > 0) {
            expect(WebMidi.getInputById(WebMidi.inputs[0].id))
              .to.be.instanceOf(WebMidi.inputs[0].constructor);
          // }

          done();

        });

      });

    });

    describe('getOutputById()', function() {

      beforeEach('Make sure WebMidi is not already enabled.', function() {
        WebMidi.disable();
      });

      it("should throw error if WebMidi is disabled", function() {

        expect(function () {
          WebMidi.getOutputById();
        }).to.throw(Error);

      });

      it("should return false if no device is found", function(done) {

        WebMidi.enable(function() {
          expect(WebMidi.getOutputById('0000000')).to.equal(false);
          done();
        });

      });

      it("should return the right output id", function(done) {

        WebMidi.enable(function() {

          // if (WebMidi.outputs.length > 0) {
            var id = WebMidi.outputs[0].id;
            expect(WebMidi.getOutputById(id)).to.equal(WebMidi.outputs[0]);
          // }

          done();

        });

      });

      it("should return instance of Output", function(done) {

        WebMidi.enable(function() {

          if (WebMidi.outputs.length > 0) {
            expect(WebMidi.getOutputById(WebMidi.outputs[0].id))
              .to.be.instanceOf(WebMidi.outputs[0].constructor);
          }

          done();

        });

      });

    });

    describe('getInputByName()', function() {

      beforeEach('Make sure WebMidi is not already enabled.', function() {
        WebMidi.disable();
      });

      it("should throw error if WebMidi is disabled", function() {
        expect(function () {
          WebMidi.getInputByName();
        }).to.throw(Error);

      });

      it("should return false if no device is found", function(done) {

        WebMidi.enable(function() {
          expect(WebMidi.getInputByName('0000000')).to.equal(false);
          done();
        });

      });

      it("should return the right input", function(done) {

        WebMidi.enable(function() {

          if (WebMidi.inputs.length > 0) {
            var name = WebMidi.inputs[0].name;
            expect(WebMidi.getInputByName(name).name)
              .to.equal(WebMidi.inputs[0].name);
          }

          done();

        });

      });

      it("should return instance of Output", function(done) {

        WebMidi.enable(function() {

          if (WebMidi.inputs.length > 0) {
            expect(WebMidi.getInputByName(WebMidi.inputs[WebMidi.inputs.length - 1].name))
              .to.be.instanceOf(WebMidi.inputs[WebMidi.inputs.length - 1].constructor);
          }

          done();

        });

      });

    });

    describe('getOutputByName()', function() {

      beforeEach('Make sure WebMidi is not already enabled.', function() {
        WebMidi.disable();
      });

      it("should throw error if WebMidi is disabled", function() {
        expect(function () {
          WebMidi.getOutputByName();
        }).to.throw(Error);

      });

      it("should return false if no device is found", function(done) {
        WebMidi.enable(function() {
          expect(WebMidi.getOutputByName('0000000')).to.equal(false);
          done();
        });

      });

      it("should return the right output", function(done) {

        WebMidi.enable(function() {

          if (WebMidi.outputs.length > 0) {
            var name = WebMidi.outputs[0].name;
            expect(WebMidi.getOutputByName(name).name).to.equal(WebMidi.outputs[0].name);
          }

          done();

        });

      });

      it("should return instance of Output", function(done) {

        WebMidi.enable(function() {

          if (WebMidi.outputs.length > 0) {
            expect(WebMidi.getOutputByName(WebMidi.outputs[WebMidi.outputs.length - 1].name))
              .to.be.instanceOf(WebMidi.outputs[WebMidi.outputs.length - 1].constructor);
          }

          done();

        });

      });

    });

    describe('guessNoteNumber()', function() {

      it("should throw error if invalid input is provided", function() {

        [
          "abc", null, undefined, -1, 128, function () {
        }, {}, "555", "C-3", "Cb-2", "H3",
          "G#8"
        ].forEach(function (param) {

          expect(function () {
            WebMidi.guessNoteNumber(param);
          }).to.throw(Error);

        });

      });

      it("should provide the correct value", function() {

        for (var i = 0; i <= 127; i++) {
          expect(WebMidi.guessNoteNumber(i)).to.equal(i);
          expect(WebMidi.guessNoteNumber(i + "")).to.equal(i);
          expect(WebMidi.guessNoteNumber(i + 0.1)).to.equal(i);
          expect(WebMidi.guessNoteNumber(i + 0.5)).to.equal(Math.min(i + 1, 127));
        }

        var value = 0;

        // Sharps
        for (var j = -2; j <= 8; j++) {

          for (var k = 0; k < WebMidi._notes.length; k++) {
            if (value > 127) { break; } // because there is no G#8
            expect(WebMidi.guessNoteNumber(WebMidi._notes[k] + j)).to.equal(value);
            value++;
          }

        }

        // Flats
        var flats = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
        value = 0;

        for (j = -2; j <= 8; j++) {

          for (k = 0; k < flats.length; k++) {
            if (value > 127) { break; } // because there is no G#8
            expect(WebMidi.guessNoteNumber(flats[k] + j)).to.equal(value);
            value++;
          }

        }

      });

    });

    describe('noteNameToNumber()', function() {

      it("should throw error if invalid input is provided", function() {

        [
          '', "abc", null, undefined, "G#8", "Cb-2", 'X2', "F20", function () {}, {}, "555", "C-3",
          "Cb-2", "Cbb-2", "H3", "G#8", "G##8"
        ].forEach(function (param) {

          expect(function() {
            WebMidi.noteNameToNumber(param);
          }).to.throw(RangeError);

        });

      });

    });

    describe('addListener()', function() {

      beforeEach('Make sure WebMidi is not already enabled.', function() {
        WebMidi.disable();
      });

      it("should throw error if WebMidi is disabled", function() {
        expect(function () {
          WebMidi.addListener("disconnected", function() {});
        }).to.throw(Error);

      });

      it("should throw error if event type is not supported", function(done) {

        WebMidi.enable(function() {

          ['', undefined, null, {}, 'abc', function () {}].forEach(function (param) {

            expect(function() {
              WebMidi.addListener(param, function() {});
            }).to.throw(TypeError);

          });

          done();

        });

      });

      it("should throw error if listener is not a function", function(done) {

        WebMidi.enable(function() {

          ['', undefined, null, {}, 'abc'].forEach(function (param) {

            expect(function() {
              WebMidi.addListener('statechange', param);
            }).to.throw(TypeError);

          });

          done();
        });

      });

      it("should actually add the listener", function(done) {

        WebMidi.enable(function() {
          function f() {}
          WebMidi.addListener("connected", f);
          expect(WebMidi.hasListener('connected', f)).to.equal(true);
          done();
        });

      });

    });

    describe('hasListener()', function() {

      beforeEach('Make sure WebMidi is not already enabled.', function() {
        WebMidi.disable();
      });

      it("should throw error if WebMidi is disabled", function() {
        expect(function () {
          WebMidi.hasListener("abc", function() {});
        }).to.throw(Error);

      });

      it("should throw error if event type is not supported", function(done) {

        WebMidi.enable(function() {
          expect(function() {
            WebMidi.hasListener('abc', undefined);
          }).to.throw(TypeError);
          done();
        });

      });

      it("should throw error if listener is not a function", function(done) {

        WebMidi.enable(function() {
          expect(function() {
            WebMidi.hasListener('connected', undefined);
          }).to.throw(TypeError);
          done();
        });

      });

      it("should report true if listener is present", function(done) {

        WebMidi.enable(function() {
          function f() {}
          WebMidi.addListener("connected", function() {});
          WebMidi.addListener("connected", f);
          WebMidi.addListener("connected", function() {});
          expect(WebMidi.hasListener('connected', f)).to.equal(true);
          done();
        });

      });

      it("should report false if listener is not present", function(done) {

        WebMidi.enable(function() {
          WebMidi.addListener("connected", function() {});
          expect(WebMidi.hasListener('connected', function() {})).to.equal(false);
          done();
        });

      });

    });

    describe('removeListener()', function() {

      beforeEach('Make sure WebMidi is not already enabled.', function() {
        WebMidi.disable();
      });

      it("should throw error if WebMidi is disabled", function() {
        expect(function () {
          WebMidi.removeListener("abc", function() {});
        }).to.throw(Error);

      });

      it("should throw error if event type is defined but not supported", function(done) {

        WebMidi.enable(function() {
          expect(function() {
            WebMidi.removeListener('abc', function() {});
          }).to.throw(TypeError);
          done();
        });

      });

      it("should throw error if listener is defined but not a function", function(done) {

        WebMidi.enable(function() {
          expect(function() {
            WebMidi.removeListener('connected', "abc");
          }).to.throw(TypeError);
          done();
        });

      });

      it("should actually remove the listener", function(done) {

        WebMidi.enable(function() {
          function f() {}
          WebMidi.addListener("connected", f);
          WebMidi.removeListener("connected", f);
          expect(WebMidi.hasListener('connected', f)).to.equal(false);
          done();
        });

      });

      it("should remove all listeners of the type when no listener is specified", function(done) {

        WebMidi.enable(function() {
          function a() {}
          function b() {}
          function c() {}
          WebMidi.addListener("connected", a);
          WebMidi.addListener("connected", b);
          WebMidi.addListener("connected", c);
          WebMidi.removeListener("connected");
          expect(WebMidi.hasListener('connected', a)).to.equal(false);
          expect(WebMidi.hasListener('connected', b)).to.equal(false);
          expect(WebMidi.hasListener('connected', c)).to.equal(false);
          done();
        });

      });

      it("should remove all listeners when no type and no listener is specified", function(done) {

        WebMidi.enable(function() {
          function a() {}
          function b() {}
          function c() {}
          WebMidi.addListener("connected", a);
          WebMidi.addListener("connected", b);
          WebMidi.addListener("connected", c);
          WebMidi.removeListener();
          expect(WebMidi.hasListener('connected', a)).to.equal(false);
          expect(WebMidi.hasListener('connected', b)).to.equal(false);
          expect(WebMidi.hasListener('connected', c)).to.equal(false);
          done();
        });

      });

    });

  });

}());
