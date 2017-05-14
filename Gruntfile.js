module.exports = function(grunt) {
  grunt.initConfig({
	aws: grunt.file.readJSON("credentials.json"),
	s3: {
	  options: {
		accessKeyId: "<%= aws.accessKeyId %>",
		secretAccessKey: "<%= aws.secretAccessKey %>",
		region: "eu-west-1",
		bucket: "grulitoworld"
	  },
	  build: {
			cwd: "build/",
			src: "**"
	  },
		move: {
			cwd: "build/",
			src: "**",
			dest: "output/"
  },
	}
  });
  grunt.loadNpmTasks('grunt-aws');
};
