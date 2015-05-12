'use strict';

(function () {
    var fs = require('fs'),
        path = require('path'),
        Configurer = {},
        grunt;

    Configurer.init = function (_grunt) {
        grunt = _grunt;
        if (typeof grunt.registerTask !== 'function') {
            throw new Error('invalid grunt object');
        }
    };

    Configurer.configure = function (options) {
        var _options = options || {};
        var config = {};
        fs.readdirSync(__dirname + '/include').forEach(function (include) {
            var key = include.substring(0, include.lastIndexOf('.')),
                _config = require(path.resolve(__dirname, 'include', include))(grunt, _options[key]);
            if (typeof _config === 'object') {
                config[key] = _config;
            }
        });

        return config;
    };

    Configurer.initConfig = function () {

        var config = {};
        for (var i = 0; i < arguments.length; i++) {
            var _config = arguments[i];
            Object.keys(_config).forEach(function (key) {
                config[key] = _config[key];
            });
        }

        grunt.initConfig(config);
    };

    module.exports = Configurer;
})();

