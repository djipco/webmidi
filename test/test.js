var expect = chai.expect;


describe('WebMidi', function() {

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

    it("should throw error if WebMidi is disabled", function() {
      WebMidi.disable();
      expect(function () {
        WebMidi.getInputById();
      }).to.throw(Error);

    });

    it("should return false if no device is found", function(done) {

      WebMidi.disable();

      WebMidi.enable(function() {
        expect(WebMidi.getInputById('0000000')).to.equal(false);
        done();
      });

    });

    it("should return the right input id", function(done) {

      WebMidi.disable();

      WebMidi.enable(function() {

        if (WebMidi.inputs.length > 0) {
          var id = WebMidi.inputs[0].id;
          expect(WebMidi.getInputById(id)).to.equal(WebMidi.inputs[0]);
        }

        done();

      });

    });

    it("should return Object", function(done) {

      WebMidi.disable();

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

    it("should throw error if WebMidi is disabled", function() {
      WebMidi.disable();
      expect(function () {
        WebMidi.getOutputById();
      }).to.throw(Error);

    });

    it("should return false if no device is found", function(done) {

      WebMidi.disable();

      WebMidi.enable(function() {
        expect(WebMidi.getOutputById('0000000')).to.equal(false);
        done();
      });

    });

    it("should return the right output id", function(done) {

      WebMidi.disable();

      WebMidi.enable(function() {

        if (WebMidi.outputs.length > 0) {
          var id = WebMidi.outputs[0].id;
          expect(WebMidi.getOutputById(id)).to.equal(WebMidi.outputs[0]);
        }

        done();

      });

    });

    it("should return object", function(done) {

      WebMidi.disable();

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

    it("should throw error if WebMidi is disabled", function() {
      WebMidi.disable();
      expect(function () {
        WebMidi.getInputByName();
      }).to.throw(Error);

    });

    it("should return false if no device is found", function(done) {

      WebMidi.disable();

      WebMidi.enable(function() {
        expect(WebMidi.getInputByName('0000000')).to.equal(false);
        done();
      });

    });

    it("should return the right input", function(done) {

      WebMidi.disable();

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

      WebMidi.disable();

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

    it("should throw error if WebMidi is disabled", function() {
      WebMidi.disable();
      expect(function () {
        WebMidi.getOutputByName();
      }).to.throw(Error);

    });

    it("should return false if no device is found", function(done) {

      WebMidi.disable();

      WebMidi.enable(function() {
        expect(WebMidi.getOutputByName('0000000')).to.equal(false);
        done();
      });

    });

    it("should return the right output", function(done) {

      WebMidi.disable();

      WebMidi.enable(function() {

        if (WebMidi.outputs.length > 0) {
          var name = WebMidi.outputs[0].name;
          expect(WebMidi.getOutputByName(name).name).to.equal(WebMidi.outputs[0].name);
        }

        done();

      });

    });

    it("should return Object", function(done) {

      WebMidi.disable();

      WebMidi.enable(function() {

        if (WebMidi.outputs.length > 0) {
          expect(WebMidi.getOutputByName(WebMidi.outputs[WebMidi.outputs.length - 1].name))
            .to.be.instanceOf(Object);
        }

        done();

      });

    });

  });

  // /************************************************************************************************/
  // describe('Input', function() {
  //
  // });
  //
  // /************************************************************************************************/
  // describe('Output', function() {
  //
  // });

});