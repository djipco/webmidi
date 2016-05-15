(function(scope) {

  "use strict";

  // Use chai
  var expect = chai.expect;

  // WEBMIDI
  describe('WebMidi', function() {

    // TEST SINGLETON
    // TEST TIMING
    // TEST INPUT/OUTPUT CREATION ?

    /************************************************************************************************/
    describe('enable()', function() {

      beforeEach('Make sure WebMidi is not already enabled.', function() {
        WebMidi.disable();
      });

      it("should throw error if callback is not a function", function () {
        expect(function () {
          WebMidi.enable();
        }).to.throw(TypeError);
      });

      it("should throw error if the Web MIDI API is not supported", function () {
        if (!WebMidi.supported) {
          expect(function () {
            WebMidi.enable(function() {});
          }).to.throw(Error);
        }
      });

      it("should execute the callback", function(done) {
        WebMidi.enable(done);
      });

      it("should not enable sysex unless requested", function(done) {
        WebMidi.enable(function() {
          expect(WebMidi.sysexEnabled).to.equal(false);
          done();
        }, false);
      });

      it("should enable sysex if requested", function(done) {
        WebMidi.enable(function() {
          expect(WebMidi.sysexEnabled).to.equal(true);
          done();
        }, true);
      });

      it("should set the enabled property to true", function(done) {
        WebMidi.enable(function() {
          expect(WebMidi.enabled).to.equal(true);
          done();
        });
      });

    });

    /************************************************************************************************/
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

      it("should trim inputs and outputs array to 0", function(done) {

        WebMidi.enable(function() {
          WebMidi.disable();
          expect(WebMidi.inputs.length).to.equal(0);
          expect(WebMidi.outputs.length).to.equal(0);
          done();
        });

      });

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

      it("should return the right input id", function(done) {

        WebMidi.enable(function() {

          if (WebMidi.inputs.length > 0) {
            var id = WebMidi.inputs[0].id;
            expect(WebMidi.getInputById(id)).to.equal(WebMidi.inputs[0]);
          }

          done();

        });

      });

      it("should return Object", function(done) {

        WebMidi.enable(function() {

          if (WebMidi.inputs.length > 0) {
            expect(WebMidi.getInputById(WebMidi.inputs[0].id))
              .to.be.instanceOf(Object);
          }

          done();

        });

      });

    });

    /************************************************************************************************/
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

          if (WebMidi.outputs.length > 0) {
            var id = WebMidi.outputs[0].id;
            expect(WebMidi.getOutputById(id)).to.equal(WebMidi.outputs[0]);
          }

          done();

        });

      });

      it("should return object", function(done) {

        WebMidi.enable(function() {

          if (WebMidi.outputs.length > 0) {
            expect(WebMidi.getOutputById(WebMidi.outputs[0].id))
              .to.be.instanceOf(Object);
          }

          done();

        });

      });

    });

    /************************************************************************************************/
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

      it("should return object", function(done) {

        WebMidi.enable(function() {

          if (WebMidi.inputs.length > 0) {
            expect(WebMidi.getInputByName(WebMidi.inputs[WebMidi.inputs.length - 1].name))
              .to.be.instanceOf(Object);
          }

          done();

        });

      });

    });

    /************************************************************************************************/
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

      it("should return Object", function(done) {

        WebMidi.enable(function() {

          if (WebMidi.outputs.length > 0) {
            expect(WebMidi.getOutputByName(WebMidi.outputs[WebMidi.outputs.length - 1].name))
              .to.be.instanceOf(Object);
          }

          done();

        });

      });

    });

    /************************************************************************************************/
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
          expect(function() {
            WebMidi.addListener('', function() {});
          }).to.throw(TypeError);
          done();
        });

      });

      it("should throw error if listener is not a function", function(done) {

        WebMidi.enable(function() {
          expect(function() {
            WebMidi.addListener('statechange', undefined);
          }).to.throw(TypeError);
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

    /************************************************************************************************/
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


    /************************************************************************************************/
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


    /************************************************************************************************/
    describe('guessNoteNumber()', function() {

      it("should throw error if invalid input is provided", function() {

        expect(function() {
          WebMidi.guessNoteNumber();
        }).to.throw(Error);

        expect(function() {
          WebMidi.guessNoteNumber("abc");
        }).to.throw(Error);

        expect(function() {
          WebMidi.guessNoteNumber(null);
        }).to.throw(Error);

        expect(function() {
          WebMidi.guessNoteNumber(undefined);
        }).to.throw(Error);

        expect(function() {
          WebMidi.guessNoteNumber(-1);
        }).to.throw(Error);

        expect(function() {
          WebMidi.guessNoteNumber(128);
        }).to.throw(Error);

        expect(function() {
          WebMidi.guessNoteNumber(function() {});
        }).to.throw(Error);

        expect(function() {
          WebMidi.guessNoteNumber({});
        }).to.throw(Error);

        expect(function() {
          WebMidi.guessNoteNumber("555");
        }).to.throw(Error);

        expect(function() {
          WebMidi.guessNoteNumber("C-3");
        }).to.throw(Error);

        expect(function() {
          WebMidi.guessNoteNumber("Cb-2");
        }).to.throw(Error);

        expect(function() {
          WebMidi.guessNoteNumber("H3");
        }).to.throw(Error);

        expect(function() {
          WebMidi.guessNoteNumber("G#8");
        }).to.throw(Error);

      });

      it("should provide the correct value", function() {
        expect(WebMidi.guessNoteNumber(0)).to.equal(0);
        expect(WebMidi.guessNoteNumber(127)).to.equal(127);
        expect(WebMidi.guessNoteNumber("0")).to.equal(0);
        expect(WebMidi.guessNoteNumber("127")).to.equal(127);
        expect(WebMidi.guessNoteNumber(5.0)).to.equal(5);
        expect(WebMidi.guessNoteNumber(5.5)).to.equal(6);
        expect(WebMidi.guessNoteNumber("C3")).to.equal(60);
        expect(WebMidi.guessNoteNumber("C#3")).to.equal(61);
        expect(WebMidi.guessNoteNumber("D3")).to.equal(62);
        expect(WebMidi.guessNoteNumber("D#3")).to.equal(63);
        expect(WebMidi.guessNoteNumber("E3")).to.equal(64);
        expect(WebMidi.guessNoteNumber("F3")).to.equal(65);
        expect(WebMidi.guessNoteNumber("F#3")).to.equal(66);
        expect(WebMidi.guessNoteNumber("G3")).to.equal(67);
        expect(WebMidi.guessNoteNumber("G#3")).to.equal(68);
        expect(WebMidi.guessNoteNumber("A3")).to.equal(69);
        expect(WebMidi.guessNoteNumber("A#3")).to.equal(70);
        expect(WebMidi.guessNoteNumber("B3")).to.equal(71);
        expect(WebMidi.guessNoteNumber("C4")).to.equal(72);
        expect(WebMidi.guessNoteNumber("C-2")).to.equal(0);
        expect(WebMidi.guessNoteNumber("G8")).to.equal(127);
        expect(WebMidi.guessNoteNumber("Db-2")).to.equal(1);
        expect(WebMidi.guessNoteNumber("Dbb-2")).to.equal(0);
        expect(WebMidi.guessNoteNumber("Gb8")).to.equal(126);
        expect(WebMidi.guessNoteNumber("Gbb8")).to.equal(125);
      });

    });

    /************************************************************************************************/
    describe('noteNameToNumber()', function() {

      it("should throw error if invalid input is provided", function() {

        expect(function() {
          WebMidi.noteNameToNumber();
        }).to.throw(Error);

        expect(function() {
          WebMidi.noteNameToNumber('');
        }).to.throw(Error);

        expect(function() {
          WebMidi.noteNameToNumber(undefined);
        }).to.throw(Error);

        expect(function() {
          WebMidi.noteNameToNumber(null);
        }).to.throw(Error);

        expect(function() {
          WebMidi.noteNameToNumber("G#8");
        }).to.throw(Error);

        expect(function() {
          WebMidi.noteNameToNumber("Cb-2");
        }).to.throw(Error);

        expect(function() {
          WebMidi.noteNameToNumber("X2");
        }).to.throw(Error);

        expect(function() {
          WebMidi.noteNameToNumber("F20");
        }).to.throw(Error);

      });

      it("should provide the correct value", function() {
        expect(WebMidi.noteNameToNumber("C-2")).to.equal(0);
        expect(WebMidi.noteNameToNumber("C##-2")).to.equal(2);
        expect(WebMidi.noteNameToNumber("G8")).to.equal(127);
        expect(WebMidi.noteNameToNumber("Gbb8")).to.equal(125);
      });

    });

  });

  // INPUT
  describe('Input', function() {

    /************************************************************************************************/
    describe('addListener()', function() {

      beforeEach('Make sure WebMidi is not already enabled.', function() {
        WebMidi.disable();
      });

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

    /************************************************************************************************/
    describe('hasListener()', function() {

      beforeEach('Make sure WebMidi is not already enabled.', function() {
        WebMidi.disable();
      });

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


    /************************************************************************************************/
    describe('removeListener()', function() {

      beforeEach('Make sure WebMidi is not already enabled.', function() {
        WebMidi.disable();
      });

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

  });

  // OUTPUT
  describe('Output', function() {

    beforeEach('Make sure WebMidi is not already enabled.', function() {
      WebMidi.disable();
    });

    /**********************************************************************************************/
    describe('send()', function () {

      it("should throw error if status byte is invalid", function(done) {

        WebMidi.enable(function() {

          expect(function () {
            WebMidi.outputs[0].send(0);
          }).to.throw(RangeError);

          done();

        });

      });

      it("should throw error if data bytes are invalid", function(done) {

        WebMidi.enable(function() {

          expect(function () {
            WebMidi.outputs[0].send(128, -1);
            WebMidi.outputs[0].send(128, 256);
          }).to.throw(TypeError);

          done();

        });

      });

    });

    /**********************************************************************************************/
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

      it("should throw error if channel is options.time is invalid", function(done) {

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

  });

}());
