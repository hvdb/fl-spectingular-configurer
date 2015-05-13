'use strict';

function Configurer(grunt, _dirname) {
    var fs = require('fs'),
        path = require('path'),
        configuration = {},
        dirname;

    if (typeof grunt.registerTask !== 'function') {
        throw new Error('invalid grunt object');
    }
    dirname = _dirname || __dirname;

    return {
        configure: function (options) {
            var _options = options || {};
            fs.readdirSync(dirname + '/include').forEach(function (include) {
                var key = include.substring(0, include.lastIndexOf('.')),
                    _config = require(path.resolve(dirname, 'include', include))(grunt, _options[key]);
                if (typeof _config === 'object') {
                    configuration[key] = _config;
                }
            });

            return configuration;
        },
        init: function() {
            var config = {};
            for (var i = 0; i < arguments.length; i++) {
                var _config = arguments[i];
                Object.keys(_config).forEach(function (key) {
                    config[key] = _config[key];
                });
            }
            grunt.initConfig(config);
        }
    }

}

module.exports = Configurer;
