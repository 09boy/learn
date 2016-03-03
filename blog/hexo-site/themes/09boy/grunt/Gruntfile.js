module.exports = function(grunt) {
    var path = 'min/';
    var rootPage = '../source/js/'

    grunt.initConfig({
        concat: {
            home: {
                src: [rootPage + 'lib/iscroll/build/iscroll-lite.js',rootPage + 'code/lib/mobileutils.js', rootPage + 'pages/home.js'], //src文件夹下包括子文件夹下的所有文件
                dest: path + 'home.js' //合并文件在dist下名为built.js的文件                
            }
        },
        uglify: {
            home: {
                src: path + 'home.js', //压缩源文件是之前合并的buildt.js文件
                dest: rootPage + 'pages/min/home-min.js' //压缩文件为built.min.js
            }
        },
        watch: {       
            home: {            
                files: [rootPage + 'pages/home.js'],
                tasks: ['concat:home', 'uglify:home']           
            },   
            client: {
                files: [rootPage + 'pages/*'],
                options: {
                    livereload: true
                }
            }                     
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // grunt.loadNpmTasks('grunt-contrib-sass');



    grunt.registerTask('live-home', ['watch:home','watch:client']);
    // grunt.registerTask('live-orderDetail', ['watch:orderDetail','watch:client']);
    // grunt.registerTask('live-payResult', ['watch:payResult','watch:client']);
    // grunt.registerTask('live-seat', ['watch:seat','watch:client']);
    // grunt.registerTask('live-noseat', ['watch:noseat','watch:client']);
    // grunt.registerTask('live-seatArea', ['watch:seatArea','watch:client']);
    // grunt.registerTask('live-my', ['watch:my','watch:client']);
    // grunt.registerTask('live-detail', ['watch:detail','watch:client']);




    grunt.registerTask('default', ['concat', 'uglify']);
    grunt.registerTask('home', ['concat:home', 'uglify:home']);
    // grunt.registerTask('payResult', ['concat:payResult', 'uglify:payResult']);
    // grunt.registerTask('seat', ['concat:seat', 'uglify:seat']);
    // grunt.registerTask('detail', ['concat:detail', 'uglify:detail']);
    // grunt.registerTask('noseat', ['concat:noseat', 'uglify:noseat']);
    // grunt.registerTask('confirm', ['concat:confirm', 'uglify:confirm']);
    // grunt.registerTask('seatArea', ['concat:seatArea', 'uglify:seatArea']);
    // grunt.registerTask('my', ['concat:my', 'uglify:my']);
    // grunt.registerTask('scss', ['sass']);

}
