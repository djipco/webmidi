// Imports
const fs = require("fs-extra");
// const fsPromises = require("fs").promises;
const git = require("simple-git/promise")();
const path = require("path");
const process = require("process");
const jsdoc2md = require("jsdoc-to-markdown");
// const os = require("os");
// const replace = require("replace-in-file");
// const rimraf = require("@alexbinary/rimraf");
const moment = require("moment");
const Handlebars = require("handlebars");

// Paths
const ROOT_PATH = process.cwd();
const SOURCE_DIR = path.resolve(ROOT_PATH, "src");
const TARGET_PATH = path.join(process.cwd(), "website", "api", "classes");
const TEMPLATE_DIR = path.resolve(ROOT_PATH, "scripts/api-documentation/templates/");
const DJIPEVENTS = path.resolve(ROOT_PATH, "node_modules/djipevents/src/djipevents.js");

async function generate() {

  // Get source files list
  let files = await fs.readdir(SOURCE_DIR);
  files = files.map(file => path.resolve(SOURCE_DIR, file));
  files.push(DJIPEVENTS);

  // Register some helpers
  Handlebars.registerHelper("eventName", string => string.split(":")[1]);
  Handlebars.registerHelper("stripNewlines", stripNewlines);

  Handlebars.registerHelper({
    eq: (v1, v2) => v1 === v2,
    ne: (v1, v2) => v1 !== v2,
    lt: (v1, v2) => v1 < v2,
    gt: (v1, v2) => v1 > v2,
    lte: (v1, v2) => v1 <= v2,
    gte: (v1, v2) => v1 >= v2,
    and() {
      return Array.prototype.every.call(arguments, Boolean);
    },
    or() {
      return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
    }
  });

  // Register partials
  // let partialFile = path.resolve(TEMPLATE_DIR, "partials/params.hbs");
  // let partial = Handlebars.compile(fs.readFileSync(partialFile, "utf-8"));
  // Handlebars.registerPartial("params", partial);
  //
  // partialFile = path.resolve(TEMPLATE_DIR, "partials/properties.hbs");
  // partial = Handlebars.compile(fs.readFileSync(partialFile, "utf-8"));
  // Handlebars.registerPartial("properties", partial);

  files.forEach(filepath => {

    // Parse file and gather output
    const output = parseFile(filepath);

    // Save markdown files (exceptn for djipevents)
    const basename = path.basename(filepath, ".js");
    if (basename !== path.basename(DJIPEVENTS, ".js")) {
      fs.writeFileSync(path.resolve(TARGET_PATH, `${basename}.md`), output);
      console.info(`Saved markdown file to ${basename}.md`);
    }

  });

  // Commit generated files
  await git.add([TARGET_PATH]);
  await git.commit("Automatically generated on: " + moment().format(), [TARGET_PATH]);
  console.info(`Files in ${TARGET_PATH} committed to git`);
  await git.push();
  console.info(`Files pushed to remote`);

}

function parseFile(filepath) {

  let output = "";
  let hbs;
  let filtered;

  const data = jsdoc2md.getTemplateDataSync({files: filepath});

  // Sort elements according to kind and then according to name
  const order = {class: 0, constructor: 1, function: 2, member: 3, event: 4, enum: 5, typedef: 6};
  data.sort((a, b) => {
    if (order[a.kind] === order[b.kind]) {
      return a.id.localeCompare(b.id);
    } else {
      return order[a.kind] < order[b.kind] ? -1 : 1;
    }
  });

  // Class
  filtered = data.filter(el => el.kind === "class")[0];
  hbs = fs.readFileSync(path.resolve(TEMPLATE_DIR, `core/class.hbs`), {encoding: "utf-8"});
  output += Handlebars.compile(hbs)(filtered);


  // Constructor
  filtered = data.filter(el => el.kind === "constructor")[0];
  hbs = fs.readFileSync(path.resolve(TEMPLATE_DIR, `core/constructor.hbs`), {encoding: "utf-8"});
  output += Handlebars.compile(hbs)(filtered);

  // Members
  filtered = data.filter(el => el.kind === "member" && el.access !== "private");
  hbs = fs.readFileSync(path.resolve(TEMPLATE_DIR, `core/members.hbs`), {encoding: "utf-8"});
  output += Handlebars.compile(hbs)(filtered);

  // Methods
  filtered = data.filter(el => el.kind === "function" && el.access !== "private");
  hbs = fs.readFileSync(path.resolve(TEMPLATE_DIR, `core/methods.hbs`), {encoding: "utf-8"});
  output += Handlebars.compile(hbs)(filtered);

  // console.log(filtered.exceptions);
  filtered.forEach(item => {
    if (item.exceptions) {
      item.exceptions.forEach(exception => console.log(exception.type));
    }
  });

  // Events
  filtered = data.filter(el => el.kind === "event" && el.access !== "private");
  hbs = fs.readFileSync(path.resolve(TEMPLATE_DIR, `core/events.hbs`), {encoding: "utf-8"});
  output += Handlebars.compile(hbs)(filtered);

  // Enums
  filtered = data.filter(el => el.kind === "enum" && el.access !== "private");
  hbs = fs.readFileSync(path.resolve(TEMPLATE_DIR, `core/enumerations.hbs`), {encoding: "utf-8"});
  output += Handlebars.compile(hbs)(filtered);

  return output;

}

generate().catch(error => console.error("\x1b[31m", "Error: " + error, "\x1b[0m"));







function stripNewlines (input) {
  if (input) return input.replace(/[\r\n]+/g, " ");
}

//
// function tableHead () {
//
//   var args = arrayify(arguments);
//   var data = args.shift();
//   if (!data) return;
//   args.pop();
//   var cols = args;
//   var colHeaders = cols.map(function (col) {
//     var spl = col.split("|");
//     return spl[1] || spl[0];
//   });
//   cols = cols.map(function (col) {
//     return col.split("|")[0];
//   });
//   var toSplice = [];
//   cols = cols.filter(function (col, index) {
//     var hasValue = data.some(function (row) {
//       return typeof row[col] !== "undefined";
//     });
//     if (!hasValue) toSplice.push(index);
//     return hasValue;
//   });
//   toSplice.reverse().forEach(function (index) {
//     colHeaders.splice(index, 1);
//   });
//
//   var table = "| " + colHeaders.join(" | ") + " |\n";
//   table += cols.reduce(function (p) { return p + " --- |"; }, "|") + '\n';
//   return table;
// }
//
// function tableRow () {
//   var args = arrayify(arguments)
//   var rows = args.shift()
//   if (!rows) return
//   var options = args.pop()
//   var cols = args
//   var output = ''
//
//   if (options.data) {
//     var data = Handlebars.createFrame(options.data)
//     cols.forEach(function (col, index) {
//       var colNumber = index + 1
//       data['col' + colNumber] = containsData(rows, col)
//     })
//   }
//   rows.forEach(function (row) {
//     output += options.fn(row, { data: data })
//   })
//   return output
// }
//
// function containsData (rows, col) {
//   return rows.some(function (row) {
//     return typeof row[col] !== 'undefined'
//   })
// }
//
// function link (longname, options) {
//   return options.fn(_link(longname, options))
// }
//
// function _link (input, options) {
//   if (typeof input !== 'string') return null
//
//   var linked, matches, namepath
//   var output = {}
//
//   /*
//    test input for
//    1. A type expression containing a namepath, e.g. Array.<module:Something>
//    2. a namepath referencing an `id`
//    3. a namepath referencing a `longname`
//    */
//   if ((matches = input.match(/.*?<(.*?)>/))) {
//     namepath = matches[1]
//   } else {
//     namepath = input
//   }
//
//   options.hash = { id: namepath }
//   linked = _identifier(options)
//   if (!linked) {
//     options.hash = { longname: namepath }
//     linked = _identifier(options)
//   }
//   if (!linked) {
//     output = { name: input, url: null }
//   } else {
//     output.name = input.replace(namepath, linked.name)
//     if (isExternal.call(linked)) {
//       if (linked.description) {
//         output.url = '#' + anchorName.call(linked, options)
//       } else {
//         if (linked.see && linked.see.length) {
//           var firstLink = parseLink(linked.see[0])[0]
//           output.url = firstLink ? firstLink.url : linked.see[0]
//         } else {
//           output.url = null
//         }
//       }
//     } else {
//       output.url = '#' + anchorName.call(linked, options)
//     }
//   }
//   return output
// }
//
// function _identifier (options) {
//   return _identifiers(options)[0]
// }
//
// function _identifiers (options) {
//   var query = {}
//
//   for (var prop in options.hash) {
//     if (/^-/.test(prop)) {
//       query[prop.replace(/^-/, '!')] = options.hash[prop]
//     } else if (/^_/.test(prop)) {
//       query[prop.replace(/^_/, '')] = new RegExp(options.hash[prop])
//     } else {
//       query[prop] = options.hash[prop]
//     }
//   }
//   return arrayify(options.data.root).filter(where(query)).filter(function (doclet) {
//     return !doclet.ignore && (state.options.private ? true : doclet.access !== 'private')
//   })
// }
//
// function escape (input) {
//   if (typeof input !== 'string') return null
//   return input.replace(/([\*|_])/g, '\\$1')
// }
//
//
// function equal (arg1, arg2) {
//   return arg1 === arg2
// }
