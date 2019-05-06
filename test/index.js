// This is the entry-point for the tests
// var Utils = {
  
//   isNative: function(fn) {
//     return (/\{\s*\[native code\]\s*\}/).test("" + fn);
//   }
  
// };


require("./virtual-midi.test.js")
require("./webmidi.test.js")
require("./input.test.js")
require("./output.test.js")
require("./platform.test.js")