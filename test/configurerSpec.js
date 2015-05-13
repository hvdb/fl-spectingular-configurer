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
    });

    it('default config should be handled correctly', function () {
        configurer.init(grunt);

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

        configurer.init(grunt, jshint);

        expect(grunt.config.get('jshint')).toBeDefined();
        expect(grunt.config.get('jshint').options.jshintrc).toEqual('.jshintrcTest');
        expect(grunt.config.get('karma')).toBeDefined();

    });


});