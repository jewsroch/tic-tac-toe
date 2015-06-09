/*jslint node: true */
'use strict';

var dest = "../public";
var src = '.client';

module.exports = {
  browserSync: {
    proxy: 'localhost:3000',
    port: 4000
  },
};
