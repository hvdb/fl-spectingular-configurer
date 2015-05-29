'use strict';

/** bower configuration. */
module.exports = function (grunt) {
	var path = require('path');
	
	
    return {
		install: {
			options: {
				color: true,
				directory: '<%= paths.relativeBowerComponentsDirectory %>',
				command: "update",
				cwd: '<%= paths.cwd %>'
			}
		}
    };
};