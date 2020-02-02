module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),
    bower: grunt.file.readJSON("bower.json"),

    // Bumpup version
    bumpup: {
      options: {
        updateProps: {
          pkg: "package.json"
        }
      },
      files: ["package.json"]
    },

    uglify: {
      options: {
        banner: "/*\n\n" + grunt.file.read("BANNER") + "\n\n" + grunt.file.read("LICENSE.txt") +
          "*/\n\n",
        compress: {
          drop_console: true
        },
        mangle: false,
        preserveComments: false
      },
      build: {
        src: "./src/<%= pkg.name %>.js",
        dest: "./<%= pkg.name %>.min.js"
      }
    },

    // Generate doc
    yuidoc: {
      compile: {
        name: "WebMidi.js",
        version: "<%= pkg.version %>",
        description: "<%= pkg.description %>",
        url: "<%= pkg.url %>",
        logo: "http://djipco.github.io/webmidi/images/webmidijs-logo-small.png",
        options: {
          outdir: "./docs/latest",
          linkNatives: true,
          paths: ["./src/"]
        }
      }
    },

    // Files that are copied or written over must be re-committed.
    gitcommit: {
      commitupdated: {
        options: {
          message: "Release <%= pkg.version %>.",
          noVerify: true,
          noStatus: false
        },
        files: {
          src: ["<%= pkg.name %>.min.js", "docs"]
        }
      }
    },

    // Push documentation to GitHub pages
    "gh-pages": {
      options: {
        base: "./docs"
      },
      src: ["**/*"]
    },

    release: {
      options: {
        bump: false,
        commitMessage: "Release <%= version %>"
      }
    }

  });

  grunt.loadNpmTasks("grunt-bumpup");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-compress");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-yuidoc");
  grunt.loadNpmTasks("grunt-gh-pages");
  grunt.loadNpmTasks("grunt-git");
  grunt.loadNpmTasks("grunt-release");

  grunt.registerTask(
    "publish:prerelease",
    ["bumpup:prerelease", "uglify", "yuidoc", "gitcommit:commitupdated", "gh-pages", "release"]
  );

  grunt.registerTask(
    "publish:patch",
    ["bumpup:patch", "uglify", "yuidoc", "gitcommit:commitupdated", "gh-pages", "release"]
  );

  grunt.registerTask(
    "publish:minor",
    ["bumpup:minor", "uglify", "yuidoc", "gitcommit:commitupdated", "gh-pages", "release"]
  );

  grunt.registerTask(
    "publish:major",
    ["bumpup:major", "uglify", "yuidoc", "gitcommit:commitupdated", "gh-pages", "release"]
  );

  grunt.registerTask(
    "publish:manual",
    ["uglify", "yuidoc", "gitcommit:commitupdated", "gh-pages", "release"]
  );

};
