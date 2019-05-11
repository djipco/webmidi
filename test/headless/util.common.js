var Utils = {
  
  isNative: function(fn) {
    return (/\{\s*\[native code\]\s*\}/).test("" + fn);
  }
  
};

module.exports = Utils;