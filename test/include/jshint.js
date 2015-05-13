'use strict';

module.exports = function(grunt, options) {
    var _options = options || {};
    return {
        options: {
            jshintrc: _options.jshintrc || '.jshintrc',
            foo: 'bar baz'
        }
    }
};
