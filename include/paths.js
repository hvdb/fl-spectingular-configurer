'use strict';

/**
 * Paths configuration.
 * */
module.exports = function (grunt) {
    var path = require('path'),
        basePath = path.resolve(),
        bowerRcPath = path.resolve(basePath, '.bowerrc'),
        tmp = '.tmp',
        cwd = tmp + '/build';

    return {
        base: basePath,
        tmp: tmp,
        cwd: cwd,
        nolio: cwd + '/nolio',
        dist: cwd + '/dist',
        bowerComponentsDirectory: path.resolve(basePath, grunt.file.exists(bowerRcPath) ? grunt.file.readJSON(bowerRcPath).directory : 'bower_components'),
        bowerComponentsDirectoryName: grunt.file.exists(bowerRcPath) ? grunt.file.readJSON(bowerRcPath).directory : 'bower_components'
    };
};
