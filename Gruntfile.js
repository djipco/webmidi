module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    // Bumpup version
    bumpup: {
      options: {
        updateProps: {
          pkg: "package.json"
        }
      },
      files: ["package.json"]
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
