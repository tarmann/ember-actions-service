/* eslint-env node */
'use strict';

const path  = require('path');

module.exports = {
  description : 'Generates an actions service. Name must contain a hyphen.',

  fileMapTokens: function() {
    return {
      __path__: function(options) {
        if (options.pod) {
          return path.join(options.podPath, options.locals.path, options.dasherizedModuleName);
        }

        return 'services';
      }
    };
  }
}
