'use strict';

var grunt = require('grunt');
var path = require('path');
var rewire = require("rewire");

var configurer;
/**
 *
 */
describe('Configurer ', function () {

    beforeEach(function () {

        configurer = rewire('./../tasks/configurer');
        configurer.__set__('__dirname', __dirname);
        configurer.init(grunt);
    });

    it('default config should be handled correctly', function () {
        var config = configurer.configure();
        expect(config.notLoaded).toBeUndefined();
        expect(config.karma).toBeDefined();
        expect(config.jshint).toBeDefined();
        expect(config.jshint.options.jshintrc).toEqual('.jshintrc');

        configurer.initConfig(config);

        expect(grunt.config.get('jshint')).toBeDefined();
        expect(grunt.config.get('jshint').options.jshintrc).toEqual('.jshintrc');
        expect(grunt.config.get('karma')).toBeDefined();

    });

    it('exceptions on the default config should reflect to the grunt config', function () {

        var jshint = {
            jshint: {
                jshintrc: '.jshintrcTest'
            }
        };

        var config = configurer.configure(jshint);
        expect(config.notLoaded).toBeUndefined();
        expect(config.karma).toBeDefined();
        expect(config.jshint).toBeDefined();
        expect(config.jshint.options.jshintrc).toEqual('.jshintrcTest');

        configurer.initConfig(config);

        expect(grunt.config.get('jshint')).toBeDefined();
        expect(grunt.config.get('jshint').options.jshintrc).toEqual('.jshintrcTest');
        expect(grunt.config.get('karma')).toBeDefined();

    });


});