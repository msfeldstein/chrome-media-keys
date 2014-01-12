module.exports = (grunt) ->
	grunt.initConfig
		image_resize:
			icon16:
				options: width: 16
				files: 'ext/icon16.png': 'src/icon.png'
			icon48:
				options: width: 48
				files: 'ext/icon48.png': 'src/icon.png'
			icon128:
				options: width: 128
				files: 'ext/icon128.png': 'src/icon.png'
		copy:
			dev:
				files: [
					{expand: true, cwd: 'dev/', src: '**/*.js', dest: 'ext/'}
				]
			src:
				files: [
					{expand: true, cwd: 'src/', src: ['**/*.js', '**/*.png', '**/*.css', '**/*.html'], dest: 'ext/'}
					{expand: true, cwd: 'handler/', src: ['**'], dest: 'ext/handler/'}
				]
		coffee:
			dev:
				files: [
					{expand: true, cwd: 'dev/', src: '**/*.coffee', dest: 'ext/', ext: '.js'}
				]
			src:
				files: [
					{expand: true, cwd: 'src/', src: '**/*.coffee', dest: 'ext/', ext: '.js'}
				]
		haml:
			src:
				files: [
					{expand: true, cwd: 'src/', src: '**/*.haml', dest: 'ext', ext: '.html'}
				]
		watch:
			all:
				files: ['dev/**', 'src/**', 'handler/**']
				tasks: ['build:manifest', 'copy:dev', 'coffee:dev', 'copy:src', 'coffee:src', 'haml']
				
	grunt.loadNpmTasks 'grunt-image-resize'
	grunt.loadNpmTasks 'grunt-contrib-copy'
	grunt.loadNpmTasks 'grunt-contrib-watch'
	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-contrib-haml'

	grunt.registerTask 'build:manifest', 'Build chrome manifest file.', () ->
		mnf = grunt.file.readJSON 'src/manifest.json'
		
		mnf.icons =
			"16": "icon16.png"
			"48": "icon48.png"
			"128": "icon128.png"
		
		grunt.file.write 'ext/manifest.json', JSON.stringify(mnf)
		
	grunt.registerTask 'build:icons', ['image_resize:icon16', 'image_resize:icon48', 'image_resize:icon128']
	grunt.registerTask 'build:sources', ['copy:src', 'coffee:src']
	grunt.registerTask 'build', ['build:manifest', 'build:icons', 'build:sources']
	grunt.registerTask 'run', ['build:manifest', 'copy:dev', 'coffee:dev', 'build', 'watch']
	grunt.registerTask 'default', ['build']
	
