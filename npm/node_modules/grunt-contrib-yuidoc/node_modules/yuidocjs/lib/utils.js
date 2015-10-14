/**
 * Copyright (c) 2011, Yahoo! Inc. All rights reserved.
 * Code licensed under the BSD License:
 * https://github.com/yui/yuidoc/blob/master/LICENSE
 */
'use strict';

var path = require('path'),
    minimatch = require('minimatch'),
    fs = require('graceful-fs');

/**
 * Utilities Class
 * @class Utils
 * @module yuidoc
 */

YUI.add('utils', function (Y) {

    Y.charset = 'utf8';

    var HTML_CHARS = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#x27;',
        '/': '&#x2F;',
        '`': '&#x60;'
    };

    /**
    Escapes HTML characters in _html_.

    @method escapeHTML
    @param {String} html String to escape.
    @return {String} Escaped string.
    **/
    Y.escapeHTML = function (html) {
        return html.replace(/[&<>"'\/`]/g, function (match) {
            return HTML_CHARS[match];
        });
    };

    /**
    Normalizes the initial indentation of the given _content_ so that the first line
    is unindented, and all other lines are unindented to the same degree as the
    first line. So if the first line has four spaces at the beginning, then all
    lines will be unindented four spaces.

    @method unindent
    @param {String} content Text to unindent.
    @return {String} Unindented text.
    @private
    **/
    Y.unindent = function (content) {
        var indent = content.match(/^(\s+)/);

        if (indent) {
            content = content.replace(new RegExp('^' + indent[1], 'gm'), '');
        }

        return content;
    };

    /**
    Like `getPages()`, but returns only the files under the `layout/` subdirectory
    of the specified _dir_.

    @method getLayouts
    @param {String} dir Directory path.
    @return {Object} Mapping of layout names to layout content.
    **/
    function getLayouts(dir) {
        return getPages(path.join(dir, 'layouts'));
    }
    Y.getLayouts = getLayouts;

    /**
    Loads and returns the content of the specified page file.

    @method getPage
    @param {String} pagePath Path to a single `.handlebars` page.
    @return {String|null} Page content, or `null` if not found.
    **/
    function getPage(pagePath) {
        if (!Y.Files.isFile(pagePath)) {
            return null;
        }
        return fs.readFileSync(pagePath, Y.charset);
    }
    Y.getPage = getPage;

    /**
    Loads pages (files with a `.handlebars` extension) in the specified directory and
    returns an object containing a mapping of page names (the part of the filename)
    preceding the `.handlebars` extension) to page content.

    @method getPages
    @param {String} dir Directory path.
    @return {Object} Mapping of page names to page content.
    **/
    var cache = {};
    function getPages(dir) {
        if (cache[dir]) {
            return cache[dir];
        }
        var pages = {};

        if (!Y.Files.isDirectory(dir)) {
            return pages;
        }

        fs.readdirSync(dir).forEach(function (filename) {
            var filePath = path.join(dir, filename);

            if (path.extname(filename) === '.handlebars' && Y.Files.isFile(filePath)) {
                pages[path.basename(filename, '.handlebars')] = fs.readFileSync(filePath, Y.charset);
            }
        });
        cache[dir] = pages;

        return pages;
    }
    Y.getPages = getPages;

    /**
    Like `getPages()`, but returns only the files under the `partial/` subdirectory
    of the specified _dir_.

    @method getPartials
    @param {String} dir Directory path.
    @return {Object} Mapping of partial names to partial content.
    **/
    function getPartials(dir) {
        return getPages(path.join(dir, 'partials'));
    }
    Y.getPartials = getPartials;


    /**
    Mix/merge/munge data into the template.

    @method prepare
    @param {String} inDir The starting directory
    @param {Object} options The `options` for the meta data.
    @param {callback} callback The callback to excecute when complete
    @param {Error} callback.err
    @param {Object} callback.options Merged options.
    **/
    function prepare(inDirs, options, callback) {
        var layouts,
            partials,
            type = 'project';

        if (options && options.skipLoad) {
            // Skip loading layouts, metadata, pages, and partials and assume that
            // the caller has provided them if they want them.
            options = Y.merge({
                layouts: {},
                meta: {},
                pages: {},
                partials: {},
                viewClass: Y.DocView
            }, options);
        } else {
            // Gather layouts, metadata, pages, and partials from the specified
            // input directory, then merge them into the provided options (if any).
            //
            // Gathered data will override provided data if there are conflicts, in
            // order to support a use case where global data are provided by the
            // caller and overridden by more specific component-level data gathered
            // from the input directory.
            //
            // The metadata inheritance chain looks like this:
            //
            //   - override metadata specified via CLI (highest precedence)
            //   - component metadata (if this is a component)
            //   - project-level component default metadata (if specified and this is a component)
            //   - theme-level component default metadata (if specified and this is a component)
            //   - project metadata
            //   - theme metadata (lowest precedence)
            try {
                if (inDirs[0] === inDirs[1]) {
                    layouts = getLayouts(inDirs[0]);
                    partials = getPartials(inDirs[0]);
                } else {
                    layouts = Y.merge(getLayouts(inDirs[0]), getLayouts(inDirs[1]));
                    partials = Y.merge(getPartials(inDirs[0]), getPartials(inDirs[1]));
                }
                options = Y.merge({
                        viewClass: Y.DocView
                    },
                    options || {}, {
                        layouts: layouts,
                        meta: options.meta,
                        partials: partials
                    }
                );
            } catch (ex) {
                return callback(ex);
            }
        }

        // Mix in the override metadata, if any. It takes precedence over everything
        // else.
        Y.mix(options.meta, options.overrideMeta);

        // Set a default asset path if one isn't specified in the metadata.
        if (!options.meta.projectAssets) {
            options.meta.projectAssets = options.component ? '../assets' : 'assets';
        }

        if (!options.meta.componentAssets && options.component) {
            options.meta.componentAssets = '../assets/' + options.meta.name;
        }

        if (typeof options.meta.layout === 'undefined') {
            options.meta.layout = options.layouts[type] ? type : 'main';
        }

        callback(null, options);
    }

    Y.prepare = prepare;

    /**
     * Walk the directory tree to locate the yuidoc.json file.
     * @method getProjectData
     * @param {Path} [directory=process.cwd()] The directory to start from
     */
    var getProjectData = function (directory) {
        var dirs = [directory || process.cwd()];
        var projectData, packageData;
        var dirCount = 0;
        // keep looping until
        //  * data is found
        //  * there are no more dirs to process
        //  * we abort due to failsafe
        while (dirs.length && !projectData) {
            if (dirCount++ > 5000) {
                Y.log('Scanned ' + dirCount + ' directories looking for a yuidoc.json file, something is probably wrong here..', 'error', 'yuidoc');
                process.exit(1);
            }
            // accumulator for directories at this level
            var childDirs = [];
            // for each directory at the previous level
            dirs.forEach(function (dir) {
                // abort iterating if we have project data
                if (projectData) {
                    return;
                }
                // squelch (but log) any complaints about this particular directory
                try {
                    // for each item in this directory
                    var names = fs.readdirSync(dir);
                    names.forEach(function (name) {
                        // abort iterating a folder if we have found both data
                        if (projectData && packageData) {
                            return;
                        }
                        // build a full path
                        var p = path.join(dir, name);
                        // acquire project data from this item if possible
                        if (Y.Files.isFile(p)) {
                            projectData = getFileData(p, name, 'yuidoc.json');
                            // 'package.json' is used for auxilliary configuration
                            // if it's found. Formerly, it was only found if it
                            // came _before_'yuidoc.json' in the folder tree
                            // (never in the same folder).
                            // This code will find 'package.json' in the same
                            // folder as 'yuidoc.json'.
                            // If there is no 'yuidoc.json', former algorithm would
                            // use the deepest 'package.json' it can find, this one
                            // will use the first (most shallow) one.
                            packageData = packageData || getFileData(p, name, 'package.json');
                        }
                        // if we are a folder, but not ., .., or node_modules,
                        // then add to directory accumulator
                        if (Y.Files.isDirectory(p)) {
                            if (name.indexOf('.') === 0) {
                                return;
                            }
                            if (name === 'node_modules') {
                                Y.log('Skipping node_modules directory while scanning for yuidoc.json', 'warn', 'yuidoc');
                                return;
                            }
                            childDirs.push(p);
                        }
                    });
                } catch (dirPerm) {
                    Y.log('Accessing dir (' + dir + ') threw an error', 'warn', 'yuidoc');
                }
            });
            // iterate over new set of folders
            dirs = childDirs;
        }
        if ((packageData && projectData) || (packageData && packageData.yuidoc)) {
            projectData = mergeData(packageData, projectData);
        }
        return projectData;
    };

    var getFileData = function (p, name, file) {
        if (name === file) {
            Y.log('Loading ' + name + ' data from: ' + p, 'info', 'yuidoc');
            try {
                return Y.Files.getJSON(p);
            } catch (e) {
                var err = 'Failed to parse ' + name + ' file, please make sure it is valid JSON';
                Y.log(err, 'error', 'yuidoc');
                throw (e + '');
            }
        }
    };

    var mergeData = function (pack, project) {
        project = project || {};

        if (pack.yuidoc) {
            Object.keys(pack.yuidoc).forEach(function (key) {
                if (!project[key]) {
                    project[key] = pack.yuidoc[key];
                }
            });
        }

        ['name', 'description', 'version', 'url'].forEach(function (key) {
            if (pack[key] && !project[key]) {
                project[key] = pack[key];
            }
        });

        return project;
    };

    Y.getProjectData = getProjectData;


    /**
     * Walks the tree from this dir and returns all the subdirs
     * @method getDirs
     * @param {String} dir The dir to begin at
     * @return {Array} The array of directories..
     */
    var getDirs = function (dir) {
        var dirs = fs.readdirSync(dir),
            paths = [];

        dirs.forEach(function (d) {
            var _dir = path.join(dir, d),
                stat = fs.lstatSync(_dir);

            if (stat.isDirectory()) {
                if (_dir.indexOf('.') !== 0) {
                    paths = [].concat(paths, _dir, getDirs(_dir));
                }
            }
        });

        return paths;
    };

    Y.getDirs = getDirs;

    /**
     * Make sure all the paths passed are directories and that they are not in the ignore list.
     * @method validatePaths
     * @param {Array} paths The array of paths to validate
     * @param {String} [ignore=false] A string to call `.indexOf` on a path to determine if it should be ignored
     */
    var validatePaths = function (paths, ignore) {
        var newpaths = [];
        //Shortcut the *, . & ./ shortcuts that shall globbing fixes for us
        if (paths === '*' || paths === '.' || paths === './') {
            paths = [process.cwd()];
        }

        // Ensure that we always have an array of some kind.
        paths = paths || [];
        if (!Y.Lang.isArray(paths)) {
            paths = [paths];
        }
        paths.forEach(function (validatePath) {
            var glob = validatePath || '';

            if (process.platform === 'win32') {
                glob = validatePath.replace(/\//g, '\\\\');
            }

            var glob_paths = getDirs('.'),
                is_globbed = false;

            glob_paths.forEach(function (dir) {
                //Don't scan things in node_modules
                if (dir.indexOf('node_modules') > -1) {
                    return;
                }
                if (minimatch(dir, glob, {
                    period: true
                })) {
                    newpaths.push(dir);
                    is_globbed = true;
                }
            });

            if (!is_globbed && (Y.Files.isDirectory(glob))) {
                //If minimatch fails, check to see if it's a relative directory
                // if it is, add it directly
                newpaths.push(glob);
            }
        });

        paths = newpaths;
        paths.forEach(function (newPath) {
            try {
                if (!Y.Files.isDirectory(newPath)) {
                    throw ('Path not a directory: ' + newPath);
                }
            } catch (e) {
                throw new Error(e.message);
            }
        });

        if (!paths || !paths.forEach) {
            throw ('Paths should be an array of paths');
        }

        if (ignore) {
            if (!(ignore instanceof Array)) {
                ignore = [ignore];
            }
            var p = [],
                shouldIgnore = false;

            paths.forEach(function (v) {
                shouldIgnore = false;
                ignore.forEach(function (i) {
                    if (!shouldIgnore && v.indexOf(i) !== -1) {
                        shouldIgnore = true;
                    }
                });
                if (!shouldIgnore) {
                    p.push(v);
                }
            });
            paths = p;
        }

        paths = paths.sort();
        return paths;
    };

    Y.validatePaths = validatePaths;

    /**
     * Takes a type string and converts it to a "First letter upper cased" type. e.g. `(string -> String, object -> Object)`
     * @method fixType
     * @param {String} t The type string to convert
     * @return {String} The fixed string
     */
    var fixType = function (t) {
        if (t && t.indexOf('.') === -1) {
            t = t.replace(/{/g, '').replace(/}/g, '');
            var firstChar = t.charAt(0),
                upperFirstChar = firstChar.toUpperCase();

            if (firstChar !== upperFirstChar) {
                return upperFirstChar + t.substring(1);
            }
        }

        return t;
    };

    Y.Lang.fixType = fixType;

    /**
     * Produces a normalized web path by joining all the parts and normalizing the
     * filesystem-like path into web compatible url.
     * Supports relative and absolute paths.
     * Courtesy of [Mojito's utils](https://github.com/yahoo/mojito/)
     *
     * @method webpath
     * @param {Array|String*} url the list of parts to be joined and normalized
     * @return {String} The joined and normalized url
     **/
    function webpath() {
        var args = [].concat.apply([], arguments),
            parts = path.join.apply(path, args).split(/[\\\/]/);
        return parts.join('/');
    }

    Y.webpath = webpath;
});
