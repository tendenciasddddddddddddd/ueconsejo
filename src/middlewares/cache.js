const getExpeditionsCache = require('express-expeditious');

const defaultOptions = {
    namespace: 'expresscache',
    engine: require('expeditious-engine-memory')(),
    defaultTtl: '2 minute',
    statusCodeExpires: {
      404: '5 minutes',
      500: 0
    }
}

const cacheInit = getExpeditionsCache(defaultOptions)

module.exports = { cacheInit }