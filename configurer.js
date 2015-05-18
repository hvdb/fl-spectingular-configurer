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
 * registerTask: Register a list of tasks with the given taskname to grunt.
 *
 * @param grunt
 * @param _dirname
 * @returns {{configure: Function, init: Function, registerTask: Function}}
 * @constructor
 */
function Configurer(grunt, _dirname) {
    var fs = require('fs'),
        path = require('path'),
        configuration = {},
        dirname = _dirname || __dirname;

    if (typeof grunt.registerTask !== 'function') {
        throw new Error('invalid grunt object');
    }

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
        init: function () {
            var config = {};
            for (var i = 0; i < arguments.length; i++) {
                var _config = arguments[i];
                Object.keys(_config).forEach(function (key) {
                    if (config[key]) {
                        grunt.log.writeln('Config with key: ' + key + ' was already set trying to add the config options to the existing config.');
                        Object.keys(_config[key]).forEach(function (option) {
                            if (!config[key][option]) {
                                config[key][option] = _config[key][option];                                
                            } else {
                                grunt.fail.fatal('The configuration with key ' + key + ' and option' + option + ' is going to override the existing config. This is not allowed, override the existing config with options instead. Bye.')
                            }
                        });
                    } else {
                        config[key] = _config[key];
                    }
                });
            }
            grunt.initConfig(config);
        },
        registerTask: function (taskName, tasks) {
            grunt.registerTask(taskName, tasks);
        }
    }

}

module.exports = Configurer;
