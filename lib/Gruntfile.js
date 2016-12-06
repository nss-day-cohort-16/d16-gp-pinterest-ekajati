module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: ['../app/**/*.js'],
      options: {
        predef: ["document", "console", "$", "event", "window", "alert", "location", "require", "module", "angular", "$http", "$q" ],
        esnext: true,
        strict: 'global',
        globals: {"app": true}
      }
    },
    sass: {
      dist: {
        files: {
// target: source
          '../css/style.css': '../sass/main.scss'
        }
      }
    },
    watch: {
      javascripts: {
        files: ['../app/**/*.js'],
        tasks: ['jshint']
      },
      sass: {
        files: ['../sass/**/*.scss'],
        tasks: ['sass']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'sass', 'watch']);
};