'use strict';

/**
 * Paths configuration.
 * */
module.exports = function (grunt) {
    var path = require('path'),
        basePath = path.resolve(),
        bowerRcPath = path.resolve(basePath, '.bowerrc'),
        tmp = '.tmp',
        cwd = tmp + '/build',
        bowerComponentsDirectory = path.resolve(basePath, grunt.file.exists(bowerRcPath) ? grunt.file.readJSON(bowerRcPath).directory : 'bower_components');

    return {
        base: basePath,
        tmp: tmp,
        cwd: cwd,
        nolio: cwd + '/nolio',
        dist: cwd + '/dist',
        bowerComponentsDirectory: bowerComponentsDirectory,
        relativeBowerComponentsDirectory: path.relative(path.resolve(basePath), bowerComponentsDirectory)
    };
};
