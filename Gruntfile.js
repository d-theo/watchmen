/* eslint-disable */
module.exports = function(grunt) {
  grunt.initConfig({
  aws: grunt.file.readJSON('credentials.json'),
  s3: {
	  options: {
		accessKeyId: '<%= aws.accessKeyId %>',
		secretAccessKey: '<%= aws.secretAccessKey %>',
		region: '<%= aws.region %>',
		bucket: '<%= aws.bucketName %>'
	  },
	  build: {
			cwd: 'build/',
			src: '**'
	  },
	}
  });
  grunt.loadNpmTasks('grunt-aws');
};
