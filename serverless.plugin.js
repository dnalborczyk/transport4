'use strict'

const { env } = require('process')

module.exports.usePlugin = () => {
  if (env.NODE_ENV === 'production') {
    return 'serverless-webpack'
  }

  return 'serverless-plugin-typescript'
}
