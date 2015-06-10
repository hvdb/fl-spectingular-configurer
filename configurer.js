'use strict';

/**
 * With this configure you can load all config from the filesystem.
 * The directory it needs to search for the 'include' directory can be changed with the {_dirname} param
 *
 * You need to provide grunt as a parameter when you require this module.
 *
 * You can use 3 methods.
 *
 * configure: This will load all configuration from the 'include' directory with the _dirname as a start.
 * You can provide extra configuration as a parameter.
 *
 * init: This will get all config and add it to grunt so that you can use it in your grunt process.
 *
 *
 * @param grunt
 * @param _dirname
 * @returns {{configure: Function, init: Function}}
 * @constructor
 */
function Configurer(grunt, _dirname) {
    var fs = require('fs'),
        path = require('path'),

        dirname = _dirname || __dirname;

    //TODO [hvdb] we need to take a look if we can do this different.
    //what it does: it changes the current working directory so that it can load tasks from this configurer.
    var parentcwd = process.cwd();
    process.chdir(__dirname);
    require('load-grunt-tasks')(grunt);
    process.chdir(parentcwd);

    if (typeof grunt.registerTask !== 'function') {
        throw new Error('invalid grunt object');
    }

    return {
        configure: function (options) {
            return loadConfigFromFileSystem(dirname, options || {});
        },
        init: function () {
            var config = {};
            var defaultConfig = {};

            for (var i = 0; i < arguments.length; i++) {
                config = handleConfig(arguments[i], config);
            }

            defaultConfig = loadConfigFromFileSystem(__dirname, {});
            config = handleConfig(defaultConfig, config, true);
            grunt.initConfig(config);
        }
    };

    /** 
     * @description Handle the config.
     *
     * @param _config {Object} The config the handle
     * @param config {Object} The current config
     * @param defaultConfig {Boolean} Indicates if default config or not.
     * @return {Object} The combined configuration
     */
    function handleConfig(_config, config, defaultConfig) {
        Object.keys(_config).forEach(function (key) {
            if (config[key]) {
                grunt.log.writeln('Config with key: ' + key + ' was already set trying to add the config options to the existing config.');
                Object.keys(_config[key]).forEach(function (option) {
                    if (!config[key][option]) {
                        config[key][option] = _config[key][option];
                    } else {
                        if (!defaultConfig) {
                            grunt.fail.fatal('The configuration with key ' + key + ' and option' + option + ' is going to override a previous config with the same key:value. This is not allowed, override the existing config with options instead. Bye.')
                        }
                    }
                });
            } else {
                config[key] = _config[key];
            }
        });
        return config;
    }

    /**
     * @description Load the configuration from the given directory and use the options provided
     *
     * @param dirname {String} The include folder path
     * @param _options {Object}
     * @return {Object} The configuration
     */
    function loadConfigFromFileSystem(dirname, _options) {
        var configuration = {};
        fs.readdirSync(dirname + '/include').forEach(function (include) {
            var key = include.substring(0, include.lastIndexOf('.')),
                _config = require(path.resolve(dirname, 'include', include))(grunt, _options);
            if (typeof _config === 'object') {
                configuration[key] = _config;
            }
        });
        return configuration;
    }
}


module.exports = Configurer;
