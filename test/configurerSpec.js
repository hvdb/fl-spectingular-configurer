'use strict';

var grunt = require('grunt');
var path = require('path');
var rewire = require("rewire");

var configurer;
/**
 *
 */
describe('configurer spec', function () {

    beforeEach(function () {
        configurer = rewire('./../tasks/configurer');
        configurer.__set__('__dirname', __dirname);
        configurer.init(grunt);
    });

    it('should get default config', function () {
        var config = configurer.configure();
        expect(config.notLoaded).toBeUndefined();
        expect(config.karma).toBeDefined();
        expect(config.jshint).toBeDefined();
        expect(config.jshint.options.jshintrc).toEqual('.jshintrc');

        expect(grunt.config.get('jshint')).toBeUndefined();
        configurer.initGruntConfig(config);

        expect(grunt.config.get('jshint')).toBeDefined();
        expect(grunt.config.get('jshint').options.jshintrc).toEqual('.jshintrc');
        expect(grunt.config.get('karma')).toBeDefined();

    });

    xit('should set non default config', function () {

        var jshint = {
            jshint: {
                jshintrc: '.jshintrcTest',
            }
        };

        var config = configurer.configure(jshint);
        expect(config.notLoaded).toBeUndefined();
        expect(config.karma).toBeDefined();
        expect(config.jshint).toBeDefined();
        expect(config.jshint.options.jshintrc).toEqual('.jshintrcTest');

        expect(grunt.config.get('jshint')).toBeUndefined();
        configurer.initGruntConfig(config);

        expect(grunt.config.get('jshint')).toBeDefined();
        expect(grunt.config.get('jshint').options.jshintrc).toEqual('.jshintrcTest');
        expect(grunt.config.get('karma')).toBeDefined();

    });

});