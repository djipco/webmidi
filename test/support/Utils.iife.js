function isNative(fn) {
  return (/\{\s*\[native code\]\s*\}/).test("" + fn);
}

