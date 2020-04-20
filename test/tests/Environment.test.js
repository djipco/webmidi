describe("Environment", function () {

  beforeEach(async function () {
    await WebMidi.enable();
  });

  afterEach(async function () {
    await WebMidi.disable();
  });

  it("should be able to rely on the virtual MIDI ports", function () {

    // The virtual device's output is seen as an input from WebMidi's perspective and vice-versa
    const input = WebMidi.getInputByName("Virtual Output");
    expect(input.name).to.equal("Virtual Output");
    const output = WebMidi.getOutputByName("Virtual Input");
    expect(output.name).to.equal("Virtual Input");

  });

});
