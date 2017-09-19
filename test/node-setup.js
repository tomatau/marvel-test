// This file ensures JSDOM is loaded before React is included
const nhf = require('node-hook-filename')

delete process.env.DEBUG
process.env.NODE_ENV = 'test'

require('babel-core/register')({
  only: [
    /\/src\//,
    /\/test\//,
  ],
})

require('../src/helpers/cssModulesHook')
require('../src/helpers/globalJSDOM')

nhf([ /\.svg/, /\.jpg/, /\.jpeg/, /\.png/ ], nhf.normalize)
