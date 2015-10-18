module.exports = function (grunt) {

  'use strict';

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Empty the minified file from the dist directory
    clean: {
      default: ["../dist/<%= pkg.name %>-*.min.js"],
      options: {
        force: true
      }
    },

    // Bumpup version
    bumpup: {
      options: {
        updateProps: {
          pkg: 'package.json'
        }
      },
      files: ['package.json']
    },

    // Minify and save in dist
    uglify: {
      options: {
        banner: grunt.file.read('BANNER'),
        compress: {
          drop_console: true
        },
        preserveComments: false
      },
      build: {
        src: '../src/<%= pkg.name %>.js',
        dest: '../dist/<%= pkg.name %>-<%= pkg.version %>.min.js'
      }
    },

    // Generate doc
    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        version: '<%= pkg.version %>',
        description: '<%= pkg.description %>',
        url: '<%= pkg.url %>',
        options: {
          outdir: '../dist/docs',
          linkNatives: true,
          paths: ['../src']
        }
      }
    },

    //replace: {
    //  dist: {
    //    options: {
    //      patterns: [
    //        {
    //          match: 'version',
    //          replacement: '<%= pkg.version %>'
    //        },
    //        {
    //          match: 'author',
    //          replacement: '<%= pkg.author %>'
    //        }
    //      ]
    //    },
    //    files: [
    //      {
    //        expand: true,
    //        flatten: true,
    //        src: ['../dist/<%= pkg.name %>-<%= pkg.version %>.min.js'],
    //        dest: '../dist/'
    //      }
    //    ]
    //  }
    //},

    // Copy file to the example folder
    copy: {
      main: {

        files: [
          { src: '../dist/<%= pkg.name %>-<%= pkg.version %>.min.js', dest: '../dist/examples/js/<%= pkg.name %>.min.js' },
          { src: '../dist/<%= pkg.name %>-<%= pkg.version %>.min.js', dest: '../npm/<%= pkg.name %>.min.js' },
          { src: '../README.md', dest: '../npm/README.md' }
        ]

      }
    },

    // Create an archive package
    compress: {
      main: {
        options: {
          archive: '../archives/<%= pkg.name %>-<%= pkg.version %>.zip'
        },
        files: [
          {src: ['**'], cwd: "../dist/", expand: true}
        ]
      }
    },

    // Push documentation to GitHub pages
    'gh-pages': {
      options: {
        base: '../dist/docs'
      },
      src: ['**/*']
    },

    release: {
      options: {
        bump: false,
        commitMessage: 'Release <%= version %>'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bumpup');
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-yuidoc");
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-release');
  grunt.loadNpmTasks('grunt-gh-pages');

  grunt.registerTask('publish', ['publish:prerelease']);
  grunt.registerTask("publish:prerelease", ['clean', 'bumpup:prerelease', 'uglify', 'yuidoc', 'copy', 'compress', 'release']);
  grunt.registerTask("publish:patch", ['bumpup:patch', 'yuidoc', 'release']);
  grunt.registerTask('publish:minor', ['bumpup:minor', 'yuidoc', 'release']);
  grunt.registerTask('publish:major', ['bumpup:major', 'yuidoc', 'release']);

};
