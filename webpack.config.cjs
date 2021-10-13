const { env } = require('process')
const { lib } = require('serverless-webpack')

module.exports = {
  entry: lib.entries,
  externals: ['encoding'], // used by node-fetch @2.x
  mode: env.NODE_ENV === 'production' ? 'production' : 'development',
  module: {
    rules: [
      {
        loader: 'ts-loader',
        options: {
          experimentalWatchApi: true,
          transpileOnly: true,
        },
        test: /\.ts$/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.ts'],
    mainFields: ['main'],
  },
  target: 'node',
}
