const ddata = require("./ddata.js");

/**
 * Strips newline characters (\n) from the input
 * @param input {string}
 * @returns {string}
 */
function stripNewlines (input) {
  if (input) return input.replace(/[\r\n]+/g, " ");
}
exports.stripNewlines = stripNewlines;

/**
 * Extract the event name from the jsdoc-reported name
 * @param input {string}
 * @returns {string}
 */
function eventName (input) {
  return input.split(":")[1];
}
exports.eventName = eventName;

/**
 * Replaces JSDoc {@link} tags with markdown links in the supplied text
 */
function inlineLinks (text, options) {

  if (text) {
    const links = ddata.parseLink(text);
    links.forEach(function (link) {
      const linked = ddata._link(link.url, options);
      if (link.caption === link.url) link.caption = linked.name;
      if (linked.url) link.url = linked.url;
      text = text.replace(link.original, `[${link.caption}](${link.url})`);
    });
  }

  return text;

}
exports.inlineLinks = inlineLinks;

function curly(object, open) {
  return open ? "{" : "}";
};
exports.curly = curly;

function eq(v1, v2) { return v1 === v2; }
exports.eq = eq;
function ne(v1, v2) { return v1 !== v2; }
exports.ne = ne;
function lt(v1, v2) {return v1 < v2; }
exports.lt = lt;
function gt(v1, v2) { return v1 > v2; }
exports.gt = gt;
function lte(v1, v2) { return v1 <= v2; }
exports.lte = lte;
function gte(v1, v2) { return v1 >= v2; }
exports.gte = gte;
function and() { return Array.prototype.every.call(arguments, Boolean); }
exports.and = and;
function or() { return Array.prototype.slice.call(arguments, 0, -1).some(Boolean); }
exports.or = or;

function methodSignature(context) {
  return ddata.methodSig.call(context);
}
exports.methodSignature = methodSignature;
