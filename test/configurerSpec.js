'use strict';

var grunt = require('grunt');

var configurer;
/**
 *
 */
describe('Configurer ', function () {

    beforeEach(function () {

        configurer = require('./../tasks/configurer')(grunt, __dirname);

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
                jshintrc: '<%= config.paths.config %>/.jshintrc',
                foo: 'bar baz'

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

});