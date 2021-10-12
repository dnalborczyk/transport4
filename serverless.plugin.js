'use strict' // eslint-disable-line

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { env } = require('process')

exports.usePlugin = () => {
  if (env.NODE_ENV === 'production') {
    return 'serverless-webpack'
  }

  return 'serverless-plugin-typescript'
}
