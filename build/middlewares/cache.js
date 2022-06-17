"use strict";

var getExpeditionsCache = require('express-expeditious');

var defaultOptions = {
  namespace: 'expresscache',
  engine: require('expeditious-engine-memory')(),
  defaultTtl: '2 minute',
  statusCodeExpires: {
    404: '5 minutes',
    500: 0
  }
};
var cacheInit = getExpeditionsCache(defaultOptions);
module.exports = {
  cacheInit
};