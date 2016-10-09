module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    },

    connect: {
      server: {
        options: {
          port: 7000,
          base: 'www-root',
          keepalive:true
        }
      }
    },

    wiredep: {

      task: {

        // Point to the files that should be updated when
        // you run `grunt wiredep`
        src: [
          'www-root/index.html',   // .html support...
        ],

        options: {
          // See wiredep's configuration documentation for the options
          // you may pass:

          // https://github.com/taptapship/wiredep#configuration
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-wiredep');
  

  grunt.registerTask('default', ['connect']);

  grunt.registerTask('generate-pack-json', 'Generate Asset Pack', function(arg1, arg2) {
      var fs = require('fs');
      var questions_json_file = JSON.parse(fs.readFileSync('www-root/data/questions.json', 'utf8'));


      var images_questions = [];
      for(var index in questions_json_file.questions){


        var image_name = questions_json_file.questions[index].image;

        var itemAssetJson  = {};
        itemAssetJson.type = "image";
        itemAssetJson.key  = "image_question_"+index;
        itemAssetJson.url  = "assets/images_questions/"+image_name;

        images_questions.push(itemAssetJson);
      }

      var jsonPack = { 
        images_questions:images_questions,
          "meta": {
              "generated": "1401380327373",
              "app": "Phaser Asset Packer",
              "url": "http://phaser.io",
              "version": "1.0",
              "copyright": "Photon Storm Ltd. 2014"
          }
      };
      
      fs.writeFileSync('www-root/assets/images-pack.json', JSON.stringify(jsonPack,null,4) );
  });

};