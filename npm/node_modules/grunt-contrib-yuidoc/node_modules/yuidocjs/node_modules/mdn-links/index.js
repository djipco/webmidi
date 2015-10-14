/*eslint-env node*/
'use strict';
var data = {},
    get = require('https').get,
    fs = require('fs'),
    path = require('path');

if (require.main === module) {
    console.log('Updating cache');
    getData(function () {
        console.log('Done');
    });
}

module.exports = {
    /**
     * Fetches the latest data from MDN and caches it locally.
     *
     * @method update
     * @param {function} callback function to be called when download completes
     */
    update: getData,

    /**
     * Returns a link to the MDN documentation for the supplied native global (e.g. class or
     * function) or, if provided, a property belonging to that global object.
     *
     * @param {string} global name of the global object to obtain a url for
     * @param {string} [property] name of the property belonging to the class
     * @returns
     */
    getLink: function (global, method) {
        var root, base, url = '';

        if (!Object.keys(data).length) {
            data = require('./mdn-cache');
        }

        for (root in data) {
            base = data[root][global];
            if (base) {
                url = root + base._slug;

                // Add the method as a subpage, or fragment to try and get them close if there's no
                // matching subpage
                if (method) {
                    url += (base[global + '.' + method] || base[global + '.prototype.' + method] || {})._slug || '#' + method;
                }

                break;
            }
        }

        return url;
    }
};

function getData (callback) {
    // MDN base URLS
    var baseURLs = [
            'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects',
            'https://developer.mozilla.org/en-US/docs/Web/API'
        ],

        done = 0,
        output = 'module.exports = ';

    baseURLs.forEach(function (u) {
        get(u + '$children', function (res) {
            var text = '';

            res.on('data', function(d) {
                text += d;
            });

            res.on('end', function () {
                var vars = JSON.parse(text);

                data[u] = vars.subpages.reduce(function getSlugs (d, c) {
                    // Only get classes for now, though methods/functions might be useful for
                    // crosslinking
                    if (!~c.title.indexOf(' ')) {
                        c.title = c.title.replace('()', '');
                        d[c.title] = {
                            _slug: c.slug.slice(c.slug.lastIndexOf('/'))
                        };

                        // Repeat for subpages
                        c.subpages.reduce(getSlugs, d[c.title]);
                    }
                    return d;
                }, {});

                if (++done === baseURLs.length) {
                    write();
                }
            });
        });
    });

    function write () {
        fs.writeFileSync(
            path.join(__dirname, 'mdn-cache.js'),
            output + JSON.stringify(data, null, 4) + ';\n'
        );

        callback(data);
    }
}
