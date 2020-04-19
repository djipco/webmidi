const UtilsCjs = {

  isNative: function(fn) {
    return (/\{\s*\[native code\]\s*\}/).test("" + fn);
  }

};

module.exports = UtilsCjs;
