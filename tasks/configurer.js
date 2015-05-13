'use strict';

(function () {
    var fs = require('fs'),
        path = require('path'),
        Configurer = {},
        grunt,
        configuration;

    /** Initialize the configurer, set the grunt object. */
    Configurer.init = function (_grunt) {
        if (typeof _grunt.registerTask !== 'function') {
            throw new Error('invalid grunt object');
        }
        grunt = _grunt;
    };

    /** load the configuration from file system and/or use the options given. */
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
        configuration = config;
        return config;
    };

    /** load the configuration into grunt, options are extra configuration options */
    Configurer.initConfig = function (options, _configuration) {
        var config = {};
        if (options) {
            handleConfig(config, options);
        }
        handleConfig(config, _configuration || configuration);

        grunt.initConfig(config);
    };

    function handleConfig(config, _config) {
        Object.keys(_config).forEach(function (key) {
            config[key] = _config[key];
        });
        return config;
    }

    module.exports = Configurer;
})();

