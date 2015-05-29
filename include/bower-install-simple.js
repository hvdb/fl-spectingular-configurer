'use strict';

/** bower configuration. */
module.exports = function () {
    return {
		install: {
			options: {
				color: true,
				directory: '<%= paths.bowerComponentsDirectory %>'
			}
		}
    };
};