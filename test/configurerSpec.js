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
        expect(config.notLoaded).toBeUndefined();
        expect(config.karma).toBeDefined();
        expect(config.jshint).toBeDefined();
        expect(config.jshint.options.jshintrc).toEqual('.jshintrc');

        configurer.init(config);
        expect(grunt.config.get('jshint')).toBeDefined();
        expect(grunt.config.get('jshint').options.jshintrc).toEqual('.jshintrc');
        expect(grunt.config.get('karma')).toBeDefined();
    });

    it('exceptions on the default config should reflect to the grunt config', function () {
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