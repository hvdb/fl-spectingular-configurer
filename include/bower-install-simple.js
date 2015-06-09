'use strict';

/** bower configuration. */
module.exports = function (grunt) {
    return {
		install: {
			options: {
				color: true,
				directory: '<%= paths.relativeBowerComponentsDirectory %>',
				cwd: '<%= paths.base %>'
			}
		}
    };
};