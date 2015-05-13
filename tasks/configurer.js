'use strict';

(function () {
    var fs = require('fs'),
        path = require('path'),
        Configurer = {},
        grunt,
        configuration;

    /** Initialize the configurer, set the grunt object. */
    Configurer.init = function (_grunt, options) {
        if (typeof _grunt.registerTask !== 'function') {
            throw new Error('invalid grunt object');
        }
        grunt = _grunt;
        loadConfiguration(options);
    };

    /** load the configuration from file system and/or use the options given. and initialize the config. */
     function loadConfiguration(options) {
        var _options = options || {};
        var config = {};
        fs.readdirSync(__dirname + '/include').forEach(function (include) {
            var key = include.substring(0, include.lastIndexOf('.')),
                _config = require(path.resolve(__dirname, 'include', include))(grunt, _options[key]);
            if (typeof _config === 'object') {
                config[key] = _config;
            }
        });
        configuration = config;
        grunt.initConfig(config);
    }

    module.exports = Configurer;
})();

