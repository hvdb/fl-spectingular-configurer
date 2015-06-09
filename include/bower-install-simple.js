'use strict';

/** bower configuration. */
module.exports = function () {
    return {
		install: {
			options: {
				color: true,
				directory: '<%= paths.relativeBowerComponentsDirectory %>',
				command: 'update',
				cwd: '<%= paths.cwd %>'
			}
		}
    };
};