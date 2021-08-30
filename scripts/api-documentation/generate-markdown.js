const fs = require("fs-extra");
const fsPromises = require("fs").promises;
const path = require("path");
const process = require("process");
const jsdoc2md = require("jsdoc-to-markdown");
const os = require("os");
const replace = require("replace-in-file");
const rimraf = require("@alexbinary/rimraf");

const SOURCE_PATH = path.join(process.cwd(), "src");
const TARGET_PATH = path.join(process.cwd(), "website", "apix", "classes");

async function generate() {

  // Create temporary directory to host modified files
  const tempPath = await fsPromises.mkdtemp(path.join(os.tmpdir(), "webmidi-api-markdown-"));

  // Get list of source files
  let files = await fsPromises.readdir(SOURCE_PATH);

  // Copy source files to temp dir, strip out the import/export statements and create markdown file
  await files.forEach(async file => {

    await fs.copy(path.join(SOURCE_PATH, file), path.join(tempPath, file), {overwrite: true});

    const options = {
      files: path.join(tempPath, file),
      from: [/^import .*\n/gm, /^export class /gm], // strip out import and export
      to: ["", "class "]
    };
    const results = await replace(options);

    // Generate markdown from JSDoc comments
    const markdown = jsdoc2md.renderSync({
      files: path.join(tempPath, file),
      "heading-depth": 1,
    });

    // write the markdown file
    let filename = path.basename(file, ".js");
    fs.writeFileSync(path.join(TARGET_PATH, `${filename}.md`), markdown);
    console.info(`Saved markdown file to ${filename}.md`);

    await rimraf(path.join(tempPath, file));

  });

  // // Get list of modified files in tmp dir
  // let modFiles = await fsPromises.readdir(tempPath);
  // console.log(modFiles);
  // modFiles.forEach(file => {
  //
  //   // Generate markdown from JSDoc comments;
  //   const markdown = jsdoc2md.renderSync({
  //     files: path.join(tempPath, file),
  //     // configure: path.join(__dirname, "jsdoc.conf.json"),
  //     "heading-depth": 1,
  //   });
  //
  //   // write the markdown file
  //   let filename = path.basename(file, ".js");
  //   fs.writeFileSync(path.join(TARGET_PATH, `${filename}.md`), markdown);
  //   console.info(`Generating markdown file to ${filename}.md`);
  //
  // });



  // Remove temporary configuration file
  // await rimraf(tempPath);



















  // // if there"s markdown, do stuff
  // if (markdown && markdown.length > 0) {
  //   // get the package ID from the file path
  //   const packageId = filePath.match(/\/packages\/([\s\S]*?)\/src\//i)[1];
  //
  //   // check against the title overrides array
  //   let packageName;
  //   // if override, use the title, else title = capitalize packageId
  //   if (packageNameOverrides.find((item) => item.id === packageId)) {
  //     packageName = packageNameOverrides.find((item) => item.id === packageId)
  //       .name;
  //   } else {
  //     packageName = packageId.charAt(0).toUpperCase() + packageId.slice(1);
  //   }
  //
  //   if (packageName !== processingPackageName) {
  //     processingPackageName = packageName;
  //     console.log(`   Processing the ${packageName} package`);
  //   }
  //
  //   // get the sub-folder structure relative to /src/
  //   let subPath = path.dirname(filePath).match(/\/src\/([\s\S]*?)$/i)
  //     ? `${path.dirname(filePath).match(/\/src\/([\s\S]*?)$/i)[1]}`
  //     : "";
  //
  //   // Get each part of the path, filtering out empty path items
  //   const subPathArray = subPath.split("/");



  // get file name sans extension
  // let fileName = path.basename(filePath, ".js");

  // // if the file name is index, but is not the package index
  // if (subPathArray.length > 0 && fileName === "index") {
  //   // change file name to the parent folder name
  //   fileName = subPathArray[subPathArray.length - 1];
  //
  //   // remove the parent folder from the path
  //   subPathArray.pop();
  //   subPath = subPathArray.join("/");
  // }


  // check if the directory exists, if not create it
  // const writeDir = path.join(process.cwd(), `api-reference`);
  // if (!fs.existsSync(writeDir)) {
  //   fs.mkdirSync(writeDir, { recursive: true });
  // }

  // // write the markdown file
  // console.info("Generating markdown file to test.md");
  // fs.writeFileSync(path.join(TARGET_PATH, `test.md`), markdown);

  //   // update sidebar object
  //   // define the relative path for the sidebar
  //   const sidebarPath = `packages/${packageId}/api-reference${
  //     subPath ? `/${subPath}` : ""
  //   }/${fileName}`;
  //
  //   /**
  //    * Searches the parent array for the key and adds it if it's not found
  //    * @param {Array} parent The parent array to search
  //    * @param {String} key The key to search for and add
  //    */
  //   const addOnePathLevel = (parent, key) => {
  //     if (
  //       !parent.find((item) => {
  //         return Object.keys(item)[0] === key;
  //       })
  //     ) {
  //       // add the first element to the parent
  //       parent.push({ [`${key}`]: [] });
  //     }
  //   };
  //
  //   // add package path
  //   addOnePathLevel(sidebarPackages, packageName);
  //
  //   // add API Reference path
  //   addOnePathLevel(
  //     sidebarPackages.find((item) => {
  //       return Object.keys(item)[0] === packageName;
  //     })[packageName],
  //     "API Reference",
  //   );
  //
  //   // Get the API Reference item
  //   let packageApiReferenceItem = sidebarPackages
  //     .find((item) => {
  //       return Object.keys(item)[0] === packageName;
  //     })
  //     [packageName].find((item) => {
  //       return Object.keys(item)[0] === "API Reference";
  //     })["API Reference"];
  //
  //   // If there"s a subpath, recursively set the nested structure
  //   if (subPathArray.length > 0) {
  //     // make array of names
  //     const pathNameArray = subPathArray.map((item) => {
  //       return item
  //         .split("-")
  //         .map((word) => {
  //           return word.charAt(0).toUpperCase() + word.slice(1);
  //         })
  //         .join(" ");
  //     });
  //
  //     // TODO: Make nested items (index > 0) recursive
  //
  //     const addPathLevels = (parent, index) => {
  //       // If the first element in the path array does not exist
  //       if (
  //         !parent.find((item) => {
  //           return typeof item === "object" && item[pathNameArray[index]];
  //         })
  //       ) {
  //         // add the first element to the parent
  //         parent.push({
  //           [pathNameArray[index]]: [],
  //         });
  //       }
  //       // Find the index of the first path element
  //       const subItemIndex = parent.findIndex((item) => {
  //         return typeof item === "object" && item[pathNameArray[index]];
  //       });
  //
  //       // add the sidebarPath to the last path element
  //       if (pathNameArray.length - 1 === index) {
  //         // eslint-disable-next-line no-param-reassign
  //         parent[subItemIndex][pathNameArray[index]] = [
  //           // filter duplicates
  //           ...new Set([
  //             ...parent[subItemIndex][pathNameArray[index]],
  //             sidebarPath,
  //           ]),
  //         ];
  //       }
  //       if (pathNameArray.length - 2 >= index) {
  //         addPathLevels(parent[subItemIndex][pathNameArray[index]], index + 1);
  //       }
  //     };
  //
  //     // recursively add path levels
  //     addPathLevels(packageApiReferenceItem, 0);
  //   } else {
  //     // Push the sidebarPath on to the "API Reference" array
  //     packageApiReferenceItem = [
  //       // Preserve existing items, but filter duplicates
  //       ...new Set([...packageApiReferenceItem, sidebarPath]),
  //     ];
  //   }
  // }

  //
  //
  //
  //   // Let the user know what step we"re on
  //   console.log("\u001B[32m", "✔️ Package docs generated", "\u001B[0m");
  //
  //   // set packages to the updated sidebarPackages
  //   sidebars.primarySidebar.Packages = sidebarPackages;
  //
  //   // Let the user know what step we"re on
  //   console.log("Updating sidebars.js");
  //
  //   // write sidebar file
  //   fs.writeFileSync(
  //     path.join(__dirname, "../docs/sidebars.js"),
  //     `module.exports = ${JSON.stringify(sidebars, null, "  ")}`,
  //     "utf8",
  //   );
  //
  //   // run prettier on the output json
  //   execSync(`eslint --fix ${path.join(__dirname, "../docs/sidebars.js")}`);
  //
  //   // Let the user know what step we"re on
  //   console.log("\u001B[32m", "✔️ sidebars.js updated", "\u001B[0m");
}

// Execute and catch errors if any (in red)
generate().catch(error => console.error("\x1b[31m", "Error: " + error, "\x1b[0m"));



// const root = resolve(process.cwd());
// const sources = [
//   {
//     src: join(root, "src"),
//     dest: join(root, "api-reference")
//   }
// ];
//
//
// /**
//  * Make JSDoc for a given source folder
//  *
//  * @param {string} src Source folder with *.js files to generate MD for
//  * @param {string} dest Destination folder for generated MD
//  * @param {string[]} exclude Array of files to exclude
//  */
// const makeJSDocFor = (src, dest, exclude = []) => {
//
//   const jsFiles = findFiles(src, ".js");
//
//   console.log("Make JSDoc: ", src); // eslint-disable-line no-console
//   for (let i = 0; i < jsFiles.length; i += 1) {
//     if (exclude.find((arg) => jsFiles[i].endsWith(arg))) {
//       continue;
//     }
//     const newContent = jsdoc2md.renderSync({files: jsFiles[i]});
//     const ext = extname(jsFiles[i]);
//     const outputFile = basename(jsFiles[i], ext);
//     writeFileSync(join(dest, `${outputFile}.md`), newContent, "utf8");
//   }
//   console.log(
//     "Make JSDoc: Updated",
//     jsFiles.length,
//     `file${jsFiles.length > 1 ? "s" : ""} in`,
//     dest
//   ); // eslint-disable-line no-console
//
// };
//
// const findFiles = (startPath, ext, recursive = false) => {
//   let result = [];
//   const regex = new RegExp(`\\${ext}$`);
//   const files = readdirSync(startPath);
//
//   for (let i = 0; i < files.length; i += 1) {
//     const file = join(startPath, files[i]);
//     if (statSync(file).isDirectory()) {
//       if (recursive) {
//         try {
//           result = result.concat(findFiles(file, ext));
//         }
//         catch (error) {
//           console.error(error); // eslint-disable-line no-console
//         }
//       }
//     }
//     else if (regex.test(file)) {
//       result.push(file);
//     }
//   }
//   return result;
// };
//
// /**
//  * Make JSDoc
//  */
// function makeJSDoc() {
//   for (const {src, dest, exclude} of sources) {
//     makeJSDocFor(src, dest, exclude);
//   }
// }
//
// makeJSDoc();
