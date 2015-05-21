'use strict';

var grunt = require('grunt');

var configurer,
    configurer2,
    configurer3;
/**
 * Test the configurer
 */
describe('Configurer should ', function () {

    beforeEach(function () {
        configurer = require('./../configurer.js')(grunt, __dirname);
        configurer2 = require('./../configurer.js')(grunt, __dirname + '/config2');
        configurer3 = require('./../configurer.js')(grunt, __dirname + '/config3');
    });




    it('default config should be handled correctly', function () {
        var config = configurer.configure();
        configurer.init(config);
        expect(grunt.config.get('clean')).toBeDefined();
        expect(grunt.config.get('clean').files[0]).toBe(grunt.config.get('paths').tmp);

        expect(grunt.config.get('paths')).toBeDefined();
        expect(grunt.config.get('paths').base).toBe('/Users/hvdb/Documents/werk/stash/spectingular-configurer');
        expect(grunt.config.get('paths').cwd).toBe('.tmp/build');
        expect(grunt.config.get('paths').tmp).toBe('.tmp');
        expect(grunt.config.get('paths').dist).toBe('.tmp/build/dist');
        expect(grunt.config.get('paths').nolio).toBe('.tmp/build/nolio');
        expect(grunt.config.get('paths').bowerComponentsDirectory).toBe('bower_components');

        expect(grunt.config.get('bower-install-simple')).toBeDefined();
        expect(grunt.config.get('bower-install-simple').install.options.directory).toEqual('../../bower_components');
        expect(grunt.config.get('bower-install-simple').install.options.cwd).toEqual('.tmp/build');

    });

    it('should be able to configure a different paths configuration', function () {
        var config = configurer.configure();
        var cleanConfig = {
            clean: {
                files: ['tijdelijk']
            }
        }

        var pathsConfig = {
            paths: {
                cwd: 'werkDir',
                tmp: 'tijdelijk',
                dist: 'dist',
                nolio: 'nolio',
                bowerComponentsDirectory: 'bower'
            }
        }

        var bowerConfig = {
            'bower-install-simple': {
                update: {
                    options: {
                        color: true,
                        directory: "../../<%= paths.bowerComponentsDirectory %>",
                        cwd: "<%= paths.cwd %>"
                    }
                }
            }
        }

        configurer.init(config, cleanConfig, pathsConfig, bowerConfig);
        expect(grunt.config.get('clean')).toBeDefined();
        expect(grunt.config.get('clean').files[0]).toBe('tijdelijk');

        expect(grunt.config.get('paths')).toBeDefined();
        expect(grunt.config.get('paths').cwd).toBe('werkDir');
        expect(grunt.config.get('paths').tmp).toBe('tijdelijk');
        expect(grunt.config.get('paths').dist).toBe('dist');
        expect(grunt.config.get('paths').nolio).toBe('nolio');
        expect(grunt.config.get('paths').bowerComponentsDirectory).toBe('bower');

        expect(grunt.config.get('bower-install-simple')).toBeDefined();
        expect(grunt.config.get('bower-install-simple').update.options.directory).toEqual('../../bower');
        expect(grunt.config.get('bower-install-simple').update.options.cwd).toEqual('werkDir');

    })



    it('load default config from file', function () {
        var config = configurer.configure();
        expect(config.notLoaded).toBeUndefined();
        expect(config.karma).toBeDefined();
        expect(config.jshint).toBeDefined();
        expect(config.jshint.options.jshintrc).toEqual('.jshintrc');

        configurer.init(config);
        expect(grunt.config.get('jshint')).toBeDefined();
        expect(grunt.config.get('jshint').options.jshintrc).toEqual('.jshintrc');
        expect(grunt.config.get('karma')).toBeDefined();


    });

    it('exception on config loaded from file should be reflected in the configuration', function () {
        var jshint = {
            jshint: {
                jshintrc: '<%= config.paths.config %>/.jshintrc'

            }
        };
        var _config = {
            config: {
                paths: {
                    config: '/tmp/foo'
                }
            }
        };

        var config = configurer.configure(jshint);
        expect(config.notLoaded).toBeUndefined();
        expect(config.karma).toBeDefined();
        expect(config.jshint).toBeDefined();
        expect(config.jshint.options.jshintrc).toEqual('<%= config.paths.config %>/.jshintrc');
        expect(config.jshint.options.foo).toEqual('bar baz');

        configurer.init(_config, config);
        expect(grunt.config.get('jshint')).toBeDefined();
        expect(grunt.config.get('jshint').options.jshintrc).toEqual('/tmp/foo/.jshintrc');
        expect(grunt.config.get('karma')).toBeDefined();
    });

    it('default config should be handled correctly even less verbose', function () {
        var config = configurer.configure();
        configurer.init(config);
        expect(grunt.config.get('jshint')).toBeDefined();
        expect(grunt.config.get('jshint').options.jshintrc).toEqual('.jshintrc');
        expect(grunt.config.get('karma')).toBeDefined();
    });

    it('should merge configuration objects when there are more given', function () {
        var config1 = configurer.configure();
        var config2 = configurer2.configure();
        configurer.init(config1, config2);
        expect(grunt.config.get('jshint').options.foo).toEqual('bar baz');
        expect(grunt.config.get('copy').config1).toBeDefined();
        expect(grunt.config.get('copy').config2).toBeDefined();
    });

    it('should fail because the config is the same and merging is not allowed', function () {
        spyOn(grunt.fail, 'fatal');
        var config2 = configurer2.configure();
        var config3 = configurer3.configure();
        configurer.init(config2, config3);
        expect(grunt.fail.fatal).toHaveBeenCalled();
    });

});