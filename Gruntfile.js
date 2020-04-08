/* global module:true */
module.exports = function (grunt) {
  grunt.initConfig({
    // less:{
    //   compile:{
    //     files:{'dist/compiled.css':'css/*.less'}
    //   }
    // },
     htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      files: {
        src: 'index.html',  
        dest: 'dist/index.html'
      }
    },
    cssmin: {
      "dist/index.min.css": "index.css"
    },
    uglify: {
          "dist/index.min.js":"index.js",
    }
  });

  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.registerTask('default', ['htmlmin']);
  grunt.registerTask('default', ['cssmin']);

  grunt.registerTask('default', ['uglify']);

  // grunt.registerTask('default', ['less:compile']);

};