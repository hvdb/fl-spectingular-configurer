'use strict';

(function () {
    var fs = require('fs'),
        path = require('path'),
        Configurer = {},
        grunt;


    function validate() {
        if(typeof grunt.registerTask !== 'function') {
            throw new Error('invalid grunt object');
        }
    }

    Configurer.init = function(_grunt) {
        grunt = _grunt;
    };

    Configurer.configure = function(options) {
        validate();

        var _options = options || {};
        var config = {};
        fs.readdirSync(__dirname + '/include').forEach(function(include) {
            var key = include.substring(0, include.lastIndexOf('.')),
                _config = require(path.resolve(__dirname, 'include', include))(grunt, _options[key]);

            if(typeof _config === 'object') {
                config[key] = _config;
            }
        });

        return config;
    };

    Configurer.registerDefault = function(tasks) {
        grunt.registerTask('default', tasks);
    };


    Configurer.initGruntConfig = function() {

        var config = {};
        for(var i=0; i<arguments.length; i++) {
            var _config = arguments[i];
            Object.keys(_config).forEach(function(key) {
                config[key] = _config[key];
            });
        }

        grunt.initConfig(config);
    };

    module.exports = Configurer;
})();

