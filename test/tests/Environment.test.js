describe("Environment", function () {

  beforeEach(async function () {
    await WebMidi.enable();
  });

  afterEach(async function () {
    await WebMidi.disable();
  });

  it("should be able to rely on the virtual MIDI ports", async function () {
    const input = WebMidi.getInputByName("VIRTUAL MIDI-In");
    expect(input.name).to.equal("VIRTUAL MIDI-In");
    const output = WebMidi.getOutputByName("VIRTUAL MIDI-Out");
    expect(output.name).to.equal("VIRTUAL MIDI-Out");
  });

});
