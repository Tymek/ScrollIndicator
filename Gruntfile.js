module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			plugin: {
				options: {
					sourceMap: true
				},
				files: {
					'js/scrollindicator.jquery.min.js': ['js/scrollindicator.jquery.js']
				}
			}
		},
		sass: {
			options: {
				sourceMap: true
			},
			dist: {
				files: {
					'css/style.css': 'css/style.scss'
				}
			}
		},
		bower: {
			install: {}
		},
		cssmin: {
			options: {
				sourceMap: true
			},
			target: {
				files: {
					'css/style.min.css': ['css/style.css']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('default', ['bower', 'cssmin', 'sass', 'uglify']);

};