'use strict';

/**
 * Paths configuration.
 * */
module.exports = function (grunt) {
    var basePath = require('path').resolve(),
        bowerRcPath = basePath + '/.bowerrc',
        tmp = '.tmp',
        cwd = tmp + '/build';
        
    return {    
        base: basePath,
        tmp: tmp,
        cwd: cwd,
        nolio: cwd + '/nolio',
        dist: cwd + '/dist',
        bowerComponentsDirectory: grunt.file.exists(bowerRcPath) && grunt.file.readJSON(bowerRcPath).directory ? grunt.file.readJSON(bowerRcPath).directory : 'bower_components'
    
    };
};